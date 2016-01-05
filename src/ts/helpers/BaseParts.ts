/// <reference path="../typings/snapsvg/snapsvg.d.ts" />

export interface IPort {
  l: Snap.Element;
  c: Snap.Element;
  before?: Boolean;
}

export interface IPosition {
  x: number;
  y: number;
}

export default class BaseParts {
  w: number;
  center: IPosition;
  l1: IPort;
  l2: IPort;
  core: Snap.Element;
  svg: Snap.Paper;
  group: any;

  constructor(svg: Snap.Paper) {
    this.svg = svg;
  }

  getDegree(x: number, y: number) {
    return Math.atan2(y, x) * (180 / Math.PI);
  };

  degToRad(deg: number) {
    return deg * (Math.PI / 180);
  };

  getPortsPoint(l1: IPosition, l2: IPosition): IPosition[] {
    const deg = this.getDegree(l2.y - l1.y, l2.x - l1.x);
    const defX = this.w / 2 * Math.sin(this.degToRad(deg));
    const defY = this.w / 2 * Math.cos(this.degToRad(deg));

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

  private dragStart(el: IPort) {
    return (x: number, y: number) => {
      el.l.data('startX', x);
      el.l.data('startY', y);
      el.c.data('startX', x);
      el.c.data('startY', y);
      el.l.addClass('is-moving');
      el.c.addClass('is-moving');
    }
  };

  private dragMove(el: IPort) {
    return (x: number, y: number) => {
      requestAnimationFrame(() => {
        if (el.before) {
          el.l
            .attr({'x1': el.l.data('startX') + x})
            .attr({'y1': el.l.data('startY') + y});
        } else {
          el.l
            .attr({'x2': el.l.data('startX') + x})
            .attr({'y2': el.l.data('startY') + y});
        }
        el.c
          .attr({'cx': el.c.data('startX') + x})
            .attr({'cy': el.c.data('startY') + y});
      });
    }
  };

  private dragEnd(el: IPort) {
    return () => {
      const matrix = Snap.matrix(1, 0, 0, 1, 0, 0);
      const l1x = Number(this.l1.c.attr('cx'));
      const l1y = Number(this.l1.c.attr('cy'));
      const l2x = Number(this.l2.c.attr('cx'));
      const l2y = Number(this.l2.c.attr('cy'));

      const dx = (l1x + l2x) / 2;
      const dy = (l1y + l2y) / 2;

      const ports = this.getPortsPoint(
        {
          x: l1x,
          y: l1y
        },
        {
          x: l2x,
          y: l2y
        }
      );

      el.l.removeClass('is-moving');
      el.c.removeClass('is-moving');

      matrix
        .rotate(90 - this.getDegree(l2y - l1y, l2x - l1x), dx, dy)
        .translate(dx - this.center.x, dy - this.center.y);

      this.core.attr({'transform': matrix});
      this.l1.l.attr({'x2': ports[0].x, 'y2': ports[0].y});
      this.l2.l.attr({'x1': ports[1].x, 'y1': ports[1].y});
    }
  }

  setPortGroup(el: IPort) {
    return this.svg.group(
      el.l,
      el.c.drag(
        this.dragMove(el),
        this.dragStart(el),
        this.dragEnd(el)
      )
    );
  }
}
