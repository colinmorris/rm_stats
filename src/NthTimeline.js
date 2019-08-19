import React from 'react';
import { Link } from 'react-router-dom';

import Timeline from './Timeline';
import { api } from './api_helpers';
import { timeline_from_rows } from './timeline';

export default class NthTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {timeline: null};
  }
  get timeline_ix() {
    return parseInt(this.props.match.params.ix);
  }

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.ix !== prevProps.match.params.ix) {
      this.fetchData();
    }
  }
  fetchData() {
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
    <>
      <Timeline timeline={this.state.timeline}
      />
      <p className="prevnext">
        {this.timeline_ix > 1 && 
           <Link to={"/timeline/"+(this.timeline_ix-1)}>Previous</Link>
        }
           <Link to={"/timeline/"+(this.timeline_ix+1)}>Next</Link>
      </p>
    </>
    );
  }
}

