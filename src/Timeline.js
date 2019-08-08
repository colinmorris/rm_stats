import React from 'react';
import palette from 'google-palette';

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

  get cmap() {
    const titles = this.props.timeline.all_titles;
    // Why doesn't the library include the octothorpes? I have no idea.
    const colors = palette('tol', titles.length).map(hex => '#'+hex);
    const tups = titles.map( (t, i) => [t, colors[i]] );
    return new Map(tups);
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
    const cmap = this.cmap;
    let nodes = [], lines = [];
    this.events.forEach( (evt, i) => {
      // PRECONDITION: there better be room on this line for the next event
      let expanded = this.state.focused === evt;
      let coords = artist.alloc_event(evt, expanded);
      // TODO: more robust keys
      nodes.push(
        <TimelineEvent
          key={'evt-'+i}
          evt={evt}
          onEnter={() => this.focus(evt)}
          title_color={cmap.get(evt.to_title)}
          {...coords}
        />);
      if (i === this.events.length-1) { return; }
      let connector_coords = artist.alloc_connector(timeline.days_after_evt(i));
      lines.push(
          <Connector 
            key={'connector-'+i}
            title_color={cmap.get(timeline.title_as_of(i))}
            coords={connector_coords}
          />
      );
    });
    // Important that lines come before nodes - that's how we ensure that the
    // nodes are drawn over top of the lines.
    return (
  <div className="Timeline">
    <svg
      className="Timeline"
      width={artist.width}
      height={artist.height}
    >
      {lines}
      {nodes}
    </svg>

    <TimelineViewport
      event={this.state.focused}
    />
  </div>
    );
  }
}
