var raf = require('raf');

function Parts() {
  this.w = 30;
}

Parts.prototype.getDegree = function(x, y) {
  return Math.atan2(y, x) * (180 / Math.PI);
};

Parts.prototype.degToRad = function(deg) {
  return deg * (Math.PI / 180);
};

Parts.prototype.initMatrix = function() {
  return new Snap.Matrix();
};

Parts.prototype.getPortsPoint = function(l1, l2) {
  var deg = this.getDegree(l2.y - l1.y, l2.x - l1.x);
  var defX = this.w / 2 * Math.sin(this.degToRad(deg));
  var defY = this.w / 2 * Math.cos(this.degToRad(deg));

  return [
    {
      x: ((l1.x + l2.x) / 2) - defX,
      y: ((l1.y + l2.y) / 2) - defY
    },
    {
      x: ((l1.x + l2.x) / 2) + defX,
      y: ((l1.y + l2.y) / 2) + defY
    }
  ];
};

Parts.prototype._dragStart = function(el) {
  return function(x, y) {
    el.l.data('startX', x);
    el.l.data('startY', y);
    el.c.data('startX', x);
    el.c.data('startY', y);
    el.l.addClass('is-moving');
    el.c.addClass('is-moving');
  }
};

Parts.prototype._dragMove = function(el) {
  return function(x, y) {
    raf(function() {
      if (el.before) {
        el.l
          .attr('x1', el.l.data('startX') + x)
          .attr('y1', el.l.data('startY') + y);
      } else {
        el.l
          .attr('x2', el.l.data('startX') + x)
          .attr('y2', el.l.data('startY') + y);
      }
      el.c
        .attr('cx', el.c.data('startX') + x)
        .attr('cy', el.c.data('startY') + y);
    });
  }
};

Parts.prototype._dragEnd = function(el) {
  var _this = this;
  return function() {
    el.l.removeClass('is-moving');
    el.c.removeClass('is-moving');
    var l1x = Number(_this.l1.c.attr('cx'));
    var l1y = Number(_this.l1.c.attr('cy'));
    var l2x = Number(_this.l2.c.attr('cx'));
    var l2y = Number(_this.l2.c.attr('cy'));

    var dx = (l1x + l2x) / 2;
    var dy = (l1y + l2y) / 2;

    var ports = _this.getPortsPoint(
      {
        x: l1x,
        y: l1y
      },
      {
        x: l2x,
        y: l2y
      }
    );

    var matrix = _this.initMatrix();
    matrix
      .rotate(90 - _this.getDegree(l2y - l1y, l2x - l1x), dx, dy)
      .translate(dx - _this.center.x, dy - _this.center.y);

    _this.core.attr({'transform': matrix});
    _this.l1.l.attr({'x2': ports[0].x, 'y2': ports[0].y});
    _this.l2.l.attr({'x1': ports[1].x, 'y1': ports[1].y});
  }
};

module.exports = Parts;
