import BaseParts from "../helpers/BaseParts";

export default class Light extends BaseParts {
  constructor(svg: Snap.Paper) {
    super(svg);

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

    this.core = svg.group(
      svg.circle(68.8, 87, 15),
      svg.line(58.2, 76.4, 79.4, 97.6),
      svg.line(58.2, 97.6, 79.4, 76.4)
    );

    this.group = svg.group(
      this.setPortGroup(this.l1),
      this.setPortGroup(this.l2),
      this.core
    ).addClass('Light');
  }
}
