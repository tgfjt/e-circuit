var inherits = require('inherits');

var Parts = require('../helpers/Parts');

function Light(svg) {
  Parts.call(this);

  this.svg = svg;

  this.center = {
    x: 68.8,
    y: 87
  };

  this.l1 = {
    l: svg.line(16.3, 87, 68.8, 87),
    c: svg.circle(13.8, 87, 5),
    before: true
  };

  this.l2 = {
    l: svg.line(68.8, 87, 121.3, 87),
    c: svg.circle(123.8, 87, 5)
  };

  this.core = svg.group(
    svg.circle(68.8, 87, 15),
    svg.line(58.2, 76.4, 79.4, 97.6),
    svg.line(58.2, 97.6, 79.4, 76.4)
  ).addClass('Bulb');

  this.group = svg.group(
    this.setPortGroup(this.l1),
    this.setPortGroup(this.l2),
    this.core
  ).addClass('Light');
}

inherits(Light, Parts);

Light.prototype.setPortGroup = function(el) {
  return this.svg.group(
    el.l,
    el.c.drag(
      this._dragMove(el),
      this._dragStart(el),
      this._dragEnd(el)
    )
  );
};

module.exports = Light;
