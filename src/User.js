import React from 'react';

import * as dp from './display_helpers';
import * as api from './api_helpers';
import RMTable from './RMTable';
import { RM_COLS } from './constants';
import PolCounts from './PolCounts';

class UserRMsTable extends RMTable {
  extra_headings = [RM_COLS.vote];

  rows_api_call() {
    return api.user_rms(this.props.username, this.state.n);
  }
}

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: {},
      polcounts: {},
    };
  }

  get username() {
    return dp.urldecode_user(this.props.match.params.username);
  }

  fetchStats() {
    api.user_stats(this.username).then(dat => {
      this.setState({activity: dat.activity, polcounts:dat.polcounts});
    });
  }

  componentDidMount() {
    this.fetchStats();
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
      <UserRMsTable username={this.username} />
    </section>
      );
    // TODO: Maybe separate tables for vote/nom/close. And links to load the "as X" sections as separate pages?
  }
}

export default User;

