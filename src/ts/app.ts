/// <reference path="./typings/domready/domready.d.ts" />

import domready = require('domready');

import Line from "./components/Line";
import Light from "./components/Light";
import Battery from "./components/Battery";
import Register from "./components/Register";

domready(() => {
  const s = Snap('#out');

  const line1 = new Line(s);
  const light1 = new Light(s);
  const battery1 = new Battery(s);
  const register1 = new Register(s);
});
