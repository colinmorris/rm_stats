import React from 'react';

export default class TimelineEvent extends React.Component {

  render() {
    return (
    <g
      onPointerEnter={ this.props.onEnter }
    >
      <circle
        cx={this.props.cx}
        cy={this.props.cy}
        r={this.props.r}
        fill={this.props.title_color}
        stroke='black'
      />
      <text
        x={this.props.cx-this.props.r}
        y={this.props.cy+this.props.r+10}
        style={{fontSize: '9px'}}
      >
        {this.props.evt.to_title}
      </text>
    </g>
    );
  }
}

