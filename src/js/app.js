var domready = require('domready');

var Line = require('./components/Line');
var Register = require('./components/Register');
var Battery = require('./components/Battery');
var Light = require('./components/Light');

domready(function() {
  var s = Snap('#out');

  var line1 = new Line(s);
  var register1 = new Register(s);
  var battery1 = new Battery(s);
  var light1 = new Light(s);
});
