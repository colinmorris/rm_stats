import React from 'react';

const wrap = (s, w) => s.replace(
  new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n'
);

export default class TimelineEvent extends React.Component {

  render_to_title() {
    let tt = this.props.evt.to_title;
    if (tt === null) {
      return <tspan dy="1.1em">?</tspan>;
    }
    let wrapped = wrap(tt, 20);
    return wrapped.split('\n').map(chunk => (<tspan
          x={this.props.cx}
          dy="1.1em"
          key={chunk}
          >{chunk}</tspan>) );
  }

  render() {
    return (
    <g
      onPointerEnter={ this.props.onEnter }
      className="Event"
    >
      <circle
        className="Event-node"
        cx={this.props.cx}
        cy={this.props.cy}
        r={this.props.r}
        stroke={this.props.title_color}
        fill='white'
      />
      <text
        x={this.props.cx}
        y={this.props.cy+this.props.r+0}
        style={{fontSize: '9px'}}
      >
        {this.render_to_title()}
      </text>
    </g>
    );
  }
}

