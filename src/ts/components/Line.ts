/// <reference path="../typings/snapsvg/snapsvg.d.ts" />

export default class Line {
  svg: Snap.Paper;
  l: Snap.Element;
  c1: Snap.Element;
  c2: Snap.Element;
  group: any;

  constructor(svg: Snap.Paper) {
    this.svg = svg;
    this.l = svg.line(16.3, 204, 121.3, 204);
    this.c1 = svg.circle(13.8, 204, 5);
    this.c2 = svg.circle(123.8, 204, 5);

    this.setDragHandlers();

    this.group = svg.group(
      this.l,
      this.c1,
      this.c2
    ).addClass('Line');
  }

  setDragHandlers() {
    this.c1.drag(
      this._dragMove(true),
      this._dragStart(true),
      this._dragEnd()
    );
    this.c2.drag(
      this._dragMove(),
      this._dragStart(),
      this._dragEnd()
    );
  }

  _dragStart(before: Boolean = false) {
    return (x:number, y:number) => {
      var c: any;

      if (before) {
        c = this.c1;
      } else {
        c = this.c2;
      }

      this.l.data('startX', x)
        .data('startY', y)
        .addClass('is-moving');

      c.data('startX', x)
        .data('startY', y)
        .addClass('is-moving');
    }
  }

  _dragMove(before: Boolean = false) {
    return (x:number, y:number) => {
      requestAnimationFrame(() => {
        if (before) {
          this.l
            .attr({'x1': this.l.data('startX') + x})
            .attr({'y1': this.l.data('startY') + y});
          this.c1
            .attr({'cx': this.c1.data('startX') + x})
            .attr({'cy': this.c1.data('startY') + y});
        } else {
          this.l
            .attr({'x2': this.l.data('startX') + x})
            .attr({'y2': this.l.data('startY') + y});
          this.c2
            .attr({'cx': this.c2.data('startX') + x})
            .attr({'cy': this.c2.data('startY') + y});
        }
      });
    }
  }

  _dragEnd() {
    return () => {
      this.l.removeClass('is-moving');
      this.c1.removeClass('is-moving');
      this.c2.removeClass('is-moving');
    }
  }
}