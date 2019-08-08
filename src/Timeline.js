import React from 'react';

import TimelineEvent from './Event.js';
import Connector from './Connector.js';
import TimelineViewport from './Viewport';
import TimelineLayoutArtist from './Artist';
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

  get height() {
    return 300;
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
    const artist = new TimelineLayoutArtist();
    const timeline = this.props.timeline;
    let eles = [];
    this.events.forEach( (evt, i) => {
      // PRECONDITION: there better be room on this line for the next event
      let coords = artist.alloc_event(evt);
      // TODO: more robust keys
      eles.push(
        <TimelineEvent
          key={'evt-'+i}
          evt={evt}
          onEnter={() => this.focus(evt)}
          {...coords}
        />);
      if (i === this.events.length-1) { return; }
      let connector_coords = artist.alloc_connector(timeline.days_after_evt(i));
      // if it would be out of bounds, move to the next line
      eles.push(
          <Connector 
            key={'connector-'+i}
            {...connector_coords}
          />
      );
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
