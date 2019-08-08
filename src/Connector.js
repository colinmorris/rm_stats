import React from 'react';

export default class Connector extends React.Component {

  render_line(coords, color="gray") {
    return (
      <line
        {...coords}
        stroke={color}
      />
    );
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
    </g>
    );
  }
}

