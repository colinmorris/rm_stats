import React from 'react';

export default class TimelineViewport extends React.Component {

  render() {
    return (
    <div>
      Hello, {JSON.stringify(this.props.event)}
    </div>
    );
  }
}

