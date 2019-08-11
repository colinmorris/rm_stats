import React from 'react';

export default class Tick extends React.Component {

  render() {
    let tickh = 20;
    return (
    <g className="Tick">
      <text 
        x={this.props.x}
        y={this.props.y}
        >
          {this.props.label}
      </text>

      <line
        x1={this.props.x}
        x2={this.props.x}
        y1={this.props.y-tickh/2}
        y2={this.props.y+tickh/2}
      />
    </g>
    );
  }
}
