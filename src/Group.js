import React from 'react';

import Timeline from './Timeline';
import * as dp from './display_helpers';
import { api } from './api_helpers';
import { timeline_from_rows } from './timeline';

const group_to_articles = {
  small: [
    'Yogurt',
    'Deadmau5',
//    'Orange (colour)',
    'Compact disc',
    'Star Trek Into Darkness',
  ]
};

export default class TimelineGroup extends React.Component {
  constructor(props) {
    super(props);
    this.articles = group_to_articles[props.match.params.group];
    this.state = {
      loading: this.articles.length,
      timelines: new Array(this.articles.length),
    };
  }
  componentDidMount() {
    this.articles.forEach( (article, i) => {
      api('timeline/' + dp.urlencode(article), {}).then(dat => {
        this.setState( (state, props) => {
          let tls = state.timelines.slice();
          tls[i] = timeline_from_rows(dat);
          return {timelines: tls, loading: state.loading-1};
        });
      });
    });
  }

  render() {
    if (this.state.loading > 0) {
      return null;
    }
    let tls = this.state.timelines.map( (tl,i) => (
      <div key={this.articles[i]}>
      <h2>{this.articles[i]}</h2>
      <Timeline timeline={tl} />
      </div>
    ));
    return (
    <>
      {tls}
    </>
    );
  }
}
