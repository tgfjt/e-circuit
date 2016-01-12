/// <reference path="./typings/domready/domready.d.ts" />

import domready = require('domready');

import Line from "./components/Line";
import Light from "./components/Light";
import Battery from "./components/Battery";
import Register from "./components/Register";

domready(() => {
  const s = Snap('#js-out');

  const line1 = new Line(s);
  const light1 = new Light(s);
  const battery1 = new Battery(s);
  const register1 = new Register(s);

  s.group(
    line1.group,
    light1.group,
    battery1.group,
    register1.group
  ).addClass('Inventory');
});
