import React from 'react';

import Tick from './Tick';

export default class Connector extends React.Component {

  render_line(coords, color="gray") {
    return (
      <line
        {...coords}
        stroke={color}
      />
    );
  }
  render_ticks() {
    const a = this.props.src_event.closedate;
    const b = this.props.dest_event.closedate;
    if (a===undefined || b===undefined) {
      console.warn(a);
      return;
    }
    const delta  = b - a;
    let ticks = [];
    for (let yr = a.getFullYear()+1; yr <= b.getFullYear(); yr++) {
      let newyears = new Date(yr, 0);
      let frac = (newyears-a) / delta;
      ticks.push( <Tick 
          key={yr} label={yr}
          {...this.xy_for_frac(frac)}
          />
      );
    }
    return ticks;
  }
  get hingey() {
    return this.props.coords.top_hinge;
  }
  xy_for_frac(frac) {
    if (!this.hingey) {
      return {
        x: this.props.coords.x1 + (this.props.coords.x2 - this.props.coords.x1)*frac,
        y: this.props.coords.y1,
      };
    }
    // Hingey calculations :|
    const dat = this.props.coords;
    let deltas = [
      (dat.top_hinge.x - dat.x1),
      (dat.bottom_hinge.y - dat.top_hinge.y),
      (dat.x2 - dat.bottom_hinge.x),
    ];
    let lens = deltas.map(Math.abs);
    const A = lens[0], B = lens[1], C = lens[2];
    const total = A + B + C;
    const a = A/total, b = (A+B)/total;
    let fracs = lens.map(len => len/total);
    if (frac < a) {
      const rel = frac / fracs[0];
      return {x: dat.x1 + (deltas[0] * rel), y: dat.y1};
    } else if (frac < b) {
      const rel = (frac-a) / fracs[1];
      return {x: dat.top_hinge.x, y: dat.top_hinge.y + (deltas[1]*rel) };
    } else {
      const rel = (frac-b)/fracs[2];
      return {x: dat.bottom_hinge.x + (deltas[2] * rel), y: dat.y2};
    }
  }
  render_hinge() {
    const props = this.props.coords;
    const top = props.top_hinge, bot=props.bottom_hinge;
    const topline = this.render_line({x1: props.x1, y1: props.y1,
      x2: top.x, y2: top.y,
      key: 'top',
    }, this.props.title_color);
    const descender = this.render_line({
      key:'desc',
      x1: top.x, y1: top.y,
      x2: bot.x, y2: bot.y,
    }, this.props.title_color);
    const botline = this.render_line({
      key:'bot',
      x1: bot.x, y1: bot.y,
      x2: props.x2, y2: props.y2,
    }, this.props.title_color);
    return [topline, descender, botline]    
  }
  render() {
    let lines;
    if (this.props.coords.top_hinge) {
      lines = this.render_hinge();
    } else {
      lines = this.render_line(this.props.coords, this.props.title_color);
    }
    return (
    <g
      className="Connector"
    >
      {lines}
      {this.render_ticks()}
    </g>
    );
  }
}

