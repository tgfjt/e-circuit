var inherits = require('inherits');

var Parts = require('../helpers/Parts');

function Register(svg) {
  Parts.call(this);

  this.w = 37.3;

  this.center = {
    x: 68,
    y: 30
  }

  this.svg = svg;

  this.l1 = {
    l: svg.line(16.3, 30, 49.6, 30).addClass('Line'),
    c: svg.circle(13.8, 30, 5),
    before: true
  };

  this.l2 = {
    l: svg.line(86.9, 30, 121.3, 30).addClass('Line'),
    c: svg.circle(123.8, 30, 5)
  };

  this.core = svg.group(
    svg.polyline(
      49.6, 30,
      52.8, 19.9,
      59.2, 37.1,
      65.5, 19.9,
      71.9, 37.1,
      78, 19.9,
      84.4, 37.1,
      86.9, 30
    )
  );

  this.group = svg.group(
    this.setPortGroup(this.l1),
    this.setPortGroup(this.l2),
    this.core
  ).addClass('Register');
}

inherits(Register, Parts);

Register.prototype.setPortGroup = function(el) {
  return this.svg.group(
    el.l,
    el.c.drag(
      this._dragMove(el),
      this._dragStart(el),
      this._dragEnd(el)
    )
  );
};

module.exports = Register;
