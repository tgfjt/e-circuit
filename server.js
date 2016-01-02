const port = 8080;

require('http').createServer(
  require('ecstatic')({
    root: __dirname + '/public'
  })
).listen(port);

console.log('Server listen on:', port);
