import BaseParts from "../helpers/BaseParts";

export default class Register extends BaseParts {
  constructor(svg: Snap.Paper) {
    super(svg);

    this.w = 37.3;

    this.center = {
      x: 68,
      y: 30
    }

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
      svg.polyline([
        49.6, 30,
        52.8, 19.9,
        59.2, 37.1,
        65.5, 19.9,
        71.9, 37.1,
        78, 19.9,
        84.4, 37.1,
        86.9, 30
      ])
    );

    this.group = svg.group(
      this.setPortGroup(this.l1),
      this.setPortGroup(this.l2),
      this.core
    ).addClass('Register');
  }
}
