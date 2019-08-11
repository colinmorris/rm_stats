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
    // XXX: I give up on this for now
    return {x: this.props.coords.top_hinge.x, 
      y: this.props.coords.top_hinge.y,
    };
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

