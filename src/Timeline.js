import React from 'react';

import TimelineEvent from './Event.js';
import Connector from './Connector.js';
import TimelineViewport from './Viewport';
import { dummyTimeline } from './dummy_timeline.js';

import './styles/timeline.css';

/* State/props to manage:
- mapping from title to color
- width (limit)
- 
*/
export default class Timeline extends React.Component {
  static defaultProps = {
    timeline: dummyTimeline,
  };

  constructor(props) {
    super(props);
    this.state = {
      // focused event
      focused: null,
    };
  }

  get events() {
    return this.props.timeline.events;
  }

  get width() {
    // idk
    return 600;
  }

  get max_radius() {
    return this.base_radius;
  }

  get xmargin() {
    return 10;
  }
  get ymargin() {
    return 10;
  }
  get base_radius() {
    return 50;
  }

  xscale_event_interval(days) {
    return days * .5;
  }

  focus(evt) {
    this.setState({focused: evt});
  }

  render() {
    const timeline = this.props.timeline;
    let next = {
      x0: this.xmargin,
      y: this.ymargin + this.max_radius,
    };
    let eles = [];
    this.events.forEach( (evt, i) => {
      let r = this.base_radius;
      // TODO: more robust keys
      eles.push(
        <TimelineEvent
          key={'evt-'+i}
          evt={evt} r={r}
          cx={next.x0+r} cy={next.y}
          onEnter={() => this.focus(evt)}
        />);
      next.x0 += r*2;
      if (i === this.events.length-1) { return; }
      let snakelen = this.xscale_event_interval(timeline.days_after_evt(i));
      eles.push(
          <Connector 
            key={'connector-'+i}
            x1={next.x0} y1={next.y} len={snakelen}
          />
      );
      next.x0 += snakelen;
    });
    return (
  <div className="Timeline">
    <svg
      className="Timeline"
      width={this.width}
    >
      {eles}
    </svg>

    <TimelineViewport
      event={this.state.focused}
    />
  </div>
    );
  }
}
