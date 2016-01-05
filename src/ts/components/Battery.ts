import BaseParts from "../helpers/BaseParts";

export default class Battery extends BaseParts {
  constructor(svg: Snap.Paper) {
    super(svg);

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

    this.core = svg.group(
      svg.line(65.1, 136.9, 65.1, 150.7).addClass('Line'),
      svg.line(75.9, 128, 75.9, 159.5).addClass('Line')
    );

    this.group = svg.group(
      this.setPortGroup(this.l1),
      this.setPortGroup(this.l2),
      this.core
    ).addClass('Battery');
  }
}
