import React from 'react';

export default class Connector extends React.Component {

  render() {
    return (
    <g>
      <line
        x1={this.props.x1}
        y1={this.props.y1}
        x2={this.props.x1 + this.props.len}
        y2={this.props.y1}
        stroke="gray"
      />
    </g>
    );
  }
}

