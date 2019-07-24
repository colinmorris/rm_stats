import React from 'react';

import * as dp from './display_helpers';
import * as api from './api_helpers';
import RMTable from './RMTable';
import { RM_COLS } from './constants';
import PolCounts from './PolCounts';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      activity: {},
      polcounts: {},
    };
    this.n = 30;
  }

  get username() {
    return dp.urldecode_user(this.props.match.params.username);
  }

  fetchStats() {
    api.user_stats(this.username).then(dat => {
      this.setState({activity: dat.activity, polcounts:dat.polcounts});
    });
  }

  fetchRMs() {
    api.user_rms(this.username).then(dat => {
      this.setState({rows: dat});
    });
  }

  componentDidMount() {
    this.fetchStats();
    this.fetchRMs();
  }

  render() {
    const act = this.state.activity;
    return (
    <section>
      <h1>RM stats for user {this.username}</h1>
      <p>{this.username} has participated in {act.all} RMs:
      </p>
      <ul>
        <li>{act.noms} nominations</li>
        <li>{act.closes} closes</li>
        <li>{act.votes} comments/!votes</li>
      </ul>
      <p>Their most cited policies are:</p>
      <PolCounts counts={this.state.polcounts} />
      <h2>Recent RMs</h2>
      <RMTable extra_headings={[RM_COLS.vote]} rowdat={this.state.rows} />
    </section>
      );
    // TODO: Maybe separate tables for vote/nom/close. And links to load the "as X" sections as separate pages?
  }
}

export default User;

