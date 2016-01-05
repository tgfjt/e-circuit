const gulp = require('gulp');
const typescript = require('gulp-typescript');
const sass = require('gulp-sass');
const browserify = require('browserify');
const watchify = require('watchify');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buff = require('vinyl-buffer');
const gutil = require('gulp-util');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const assign = require('lodash.assign');
const ghPages = require('gulp-gh-pages');

const env = process.env.NODE_ENV

const bundle = function() {
  const customOpts = {
    entries: ['./build/js/app.js'],
    debug: true
  };
  const opts = global.isWatching ? assign({plugin: [watchify]}, watchify.args, customOpts) : customOpts;

  const b = browserify(opts);

  if (global.isWatching) {
    b.plugin(watchify);
  }

  b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .on('log', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(buff())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpif(env === 'production', streamify(uglify())))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js'));

  if (global.isWatching) {
    b.on('update', bundle);
  }
};

gulp.task('setWatch', function() {
  return global.isWatching = true;
});

gulp.task('build:ts', function() {
  return gulp.src([
    './src/ts/**/*.ts',
    '!./src/ts/typings/**/*.ts'
  ])
    .pipe(typescript({"target": "es5",
      "sortOutoput": true,
      "noImplicitAny": true,
      "module": "commonjs",
      "sourceMap": true}))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('build:css', function() {
  gulp.src('src/styles/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/css'))
});

gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

gulp.task('js', ['build:ts'], bundle);

gulp.task('watch', ['setWatch', 'js'], function() {
  gulp.watch('src/ts/**/*.ts', ['build:ts']);
  gulp.watch('src/styles/**/*.scss', ['build:css']);
});
