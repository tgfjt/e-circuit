(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/// <reference path="./typings/domready/domready.d.ts" />
var domready = require('domready');
var Line_1 = require("./components/Line");
var Light_1 = require("./components/Light");
var Battery_1 = require("./components/Battery");
var Register_1 = require("./components/Register");
domready(function () {
    var s = Snap('#js-out');
    var line1 = new Line_1.default(s);
    var light1 = new Light_1.default(s);
    var battery1 = new Battery_1.default(s);
    var register1 = new Register_1.default(s);
});

},{"./components/Battery":2,"./components/Light":3,"./components/Line":4,"./components/Register":5,"domready":7}],2:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseParts_1 = require("../helpers/BaseParts");
var Battery = (function (_super) {
    __extends(Battery, _super);
    function Battery(svg) {
        _super.call(this, svg);
        this.w = 10.8;
        this.center = {
            x: 70,
            y: 143.8
        };
        this.l1 = {
            l: svg.line(16.3, 143.8, 65.1, 143.8).addClass('Line'),
            c: svg.circle(13.8, 143.8, 5),
            before: true
        };
        this.l2 = {
            l: svg.line(75.9, 143.8, 121.3, 143.8).addClass('Line'),
            c: svg.circle(123.8, 143.8, 5)
        };
        this.core = svg.group(svg.line(65.1, 136.9, 65.1, 150.7).addClass('Line'), svg.line(75.9, 128, 75.9, 159.5).addClass('Line'));
        this.group = svg.group(this.setPortGroup(this.l1), this.setPortGroup(this.l2), this.core).addClass('Battery');
    }
    return Battery;
})(BaseParts_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Battery;

},{"../helpers/BaseParts":6}],3:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseParts_1 = require("../helpers/BaseParts");
var Light = (function (_super) {
    __extends(Light, _super);
    function Light(svg) {
        _super.call(this, svg);
        this.w = 30;
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
        this.core = svg.group(svg.circle(68.8, 87, 15), svg.line(58.2, 76.4, 79.4, 97.6), svg.line(58.2, 97.6, 79.4, 76.4));
        this.group = svg.group(this.setPortGroup(this.l1), this.setPortGroup(this.l2), this.core).addClass('Light');
    }
    return Light;
})(BaseParts_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Light;

},{"../helpers/BaseParts":6}],4:[function(require,module,exports){
/// <reference path="../typings/snapsvg/snapsvg.d.ts" />
var Line = (function () {
    function Line(svg) {
        this.svg = svg;
        this.l = svg.line(16.3, 204, 121.3, 204);
        this.c1 = svg.circle(13.8, 204, 5);
        this.c2 = svg.circle(123.8, 204, 5);
        this.setDragHandlers();
        this.group = svg.group(this.l, this.c1, this.c2).addClass('Line');
    }
    Line.prototype.setDragHandlers = function () {
        this.c1.drag(this._dragMove(true), this._dragStart(true), this._dragEnd());
        this.c2.drag(this._dragMove(), this._dragStart(), this._dragEnd());
    };
    Line.prototype._dragStart = function (before) {
        var _this = this;
        if (before === void 0) { before = false; }
        return function (x, y) {
            var c;
            if (before) {
                c = _this.c1;
            }
            else {
                c = _this.c2;
            }
            _this.l.data('startX', x)
                .data('startY', y)
                .addClass('is-moving');
            c.data('startX', x)
                .data('startY', y)
                .addClass('is-moving');
        };
    };
    Line.prototype._dragMove = function (before) {
        var _this = this;
        if (before === void 0) { before = false; }
        return function (x, y) {
            requestAnimationFrame(function () {
                if (before) {
                    _this.l
                        .attr({ 'x1': _this.l.data('startX') + x })
                        .attr({ 'y1': _this.l.data('startY') + y });
                    _this.c1
                        .attr({ 'cx': _this.c1.data('startX') + x })
                        .attr({ 'cy': _this.c1.data('startY') + y });
                }
                else {
                    _this.l
                        .attr({ 'x2': _this.l.data('startX') + x })
                        .attr({ 'y2': _this.l.data('startY') + y });
                    _this.c2
                        .attr({ 'cx': _this.c2.data('startX') + x })
                        .attr({ 'cy': _this.c2.data('startY') + y });
                }
            });
        };
    };
    Line.prototype._dragEnd = function () {
        var _this = this;
        return function () {
            _this.l.removeClass('is-moving');
            _this.c1.removeClass('is-moving');
            _this.c2.removeClass('is-moving');
        };
    };
    return Line;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Line;

},{}],5:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseParts_1 = require("../helpers/BaseParts");
var Register = (function (_super) {
    __extends(Register, _super);
    function Register(svg) {
        _super.call(this, svg);
        this.w = 37.3;
        this.center = {
            x: 68,
            y: 30
        };
        this.l1 = {
            l: svg.line(16.3, 30, 49.6, 30).addClass('Line'),
            c: svg.circle(13.8, 30, 5),
            before: true
        };
        this.l2 = {
            l: svg.line(86.9, 30, 121.3, 30).addClass('Line'),
            c: svg.circle(123.8, 30, 5)
        };
        this.core = svg.group(svg.polyline([
            49.6, 30,
            52.8, 19.9,
            59.2, 37.1,
            65.5, 19.9,
            71.9, 37.1,
            78, 19.9,
            84.4, 37.1,
            86.9, 30
        ]));
        this.group = svg.group(this.setPortGroup(this.l1), this.setPortGroup(this.l2), this.core).addClass('Register');
    }
    return Register;
})(BaseParts_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Register;

},{"../helpers/BaseParts":6}],6:[function(require,module,exports){
/// <reference path="../typings/snapsvg/snapsvg.d.ts" />
var BaseParts = (function () {
    function BaseParts(svg) {
        this.svg = svg;
    }
    BaseParts.prototype.getDegree = function (x, y) {
        return Math.atan2(y, x) * (180 / Math.PI);
    };
    ;
    BaseParts.prototype.degToRad = function (deg) {
        return deg * (Math.PI / 180);
    };
    ;
    BaseParts.prototype.getPortsPoint = function (l1, l2) {
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
    ;
    BaseParts.prototype.dragStart = function (el) {
        return function (x, y) {
            el.l.data('startX', x);
            el.l.data('startY', y);
            el.c.data('startX', x);
            el.c.data('startY', y);
            el.l.addClass('is-moving');
            el.c.addClass('is-moving');
        };
    };
    ;
    BaseParts.prototype.dragMove = function (el) {
        return function (x, y) {
            requestAnimationFrame(function () {
                if (el.before) {
                    el.l
                        .attr({ 'x1': el.l.data('startX') + x })
                        .attr({ 'y1': el.l.data('startY') + y });
                }
                else {
                    el.l
                        .attr({ 'x2': el.l.data('startX') + x })
                        .attr({ 'y2': el.l.data('startY') + y });
                }
                el.c
                    .attr({ 'cx': el.c.data('startX') + x })
                    .attr({ 'cy': el.c.data('startY') + y });
            });
        };
    };
    ;
    BaseParts.prototype.dragEnd = function (el) {
        var _this = this;
        return function () {
            var matrix = Snap.matrix(1, 0, 0, 1, 0, 0);
            var l1x = Number(_this.l1.c.attr('cx'));
            var l1y = Number(_this.l1.c.attr('cy'));
            var l2x = Number(_this.l2.c.attr('cx'));
            var l2y = Number(_this.l2.c.attr('cy'));
            var dx = (l1x + l2x) / 2;
            var dy = (l1y + l2y) / 2;
            var ports = _this.getPortsPoint({
                x: l1x,
                y: l1y
            }, {
                x: l2x,
                y: l2y
            });
            el.l.removeClass('is-moving');
            el.c.removeClass('is-moving');
            matrix
                .rotate(90 - _this.getDegree(l2y - l1y, l2x - l1x), dx, dy)
                .translate(dx - _this.center.x, dy - _this.center.y);
            _this.core.attr({ 'transform': matrix });
            _this.l1.l.attr({ 'x2': ports[0].x, 'y2': ports[0].y });
            _this.l2.l.attr({ 'x1': ports[1].x, 'y1': ports[1].y });
        };
    };
    BaseParts.prototype.setPortGroup = function (el) {
        return this.svg.group(el.l, el.c.drag(this.dragMove(el), this.dragStart(el), this.dragEnd(el)));
    };
    return BaseParts;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseParts;

},{}],7:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
