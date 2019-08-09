import React from 'react';

import Timeline from './Timeline';
import { api } from './api_helpers';
import { timeline_from_rows } from './timeline';

export default class NthTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {timeline: null};
  }
  get timeline_ix() {
    return this.props.match.params.ix;
  }

  componentDidMount() {
    api('timeline/'+this.timeline_ix, {}).then(dat => {
      let tl = timeline_from_rows(dat);
      this.setState({timeline: tl
      });
    });
  }

  render() {
    if (this.state.timeline === null) {
      return <p>Loading...</p>;
    }
    return (
      <Timeline timeline={this.state.timeline}
      />
    );
  }
}

