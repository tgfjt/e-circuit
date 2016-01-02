var raf = require('raf');

function Line(svg) {
  this.svg = svg;
  this.l = svg.line(16.3, 204, 121.3, 204);
  this.c1 = svg.circle(13.8, 204, 5);
  this.c2 = svg.circle(123.8, 204, 5);

  this.setDragHandlers();

  this.group = svg.group(
    this.l,
    this.c1,
    this.c2
  ).addClass('Line');
}

Line.prototype.setDragHandlers = function(el) {
  this.c1.drag(
    this._dragMove(true),
    this._dragStart(true),
    this._dragEnd(true)
  );
  this.c2.drag(
    this._dragMove(),
    this._dragStart(),
    this._dragEnd()
  );
};

Line.prototype._dragStart = function(before) {
  var _this = this;

  return function(x, y) {
    var c;

    if (before) {
      c = _this.c1;
    } else {
      c = _this.c2;
    }

    _this.l.data('startX', x)
      .data('startY', y)
      .addClass('is-moving');

    c.data('startX', x)
      .data('startY', y)
      .addClass('is-moving');
  }
};

Line.prototype._dragMove = function(before) {
  var _this = this;

  return function(x, y) {
    raf(function() {
      if (before) {
        _this.l
          .attr('x1', _this.l.data('startX') + x)
          .attr('y1', _this.l.data('startY') + y);
        _this.c1
          .attr('cx', _this.c1.data('startX') + x)
          .attr('cy', _this.c1.data('startY') + y);
      } else {
        _this.l
          .attr('x2', _this.l.data('startX') + x)
          .attr('y2', _this.l.data('startY') + y);
        _this.c2
          .attr('cx', _this.c2.data('startX') + x)
          .attr('cy', _this.c2.data('startY') + y);
      }
    });
  }
};

Line.prototype._dragEnd = function(before) {
  var _this = this;

  return function() {
    _this.l.removeClass('is-moving');
    _this.c1.removeClass('is-moving');
    _this.c2.removeClass('is-moving');
  }
};

module.exports = Line;
