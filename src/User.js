import React from 'react';

import * as dp from './display_helpers';
import * as api from './api_helpers';
import RMTable from './RMTable';
import { RM_COLS } from './constants';
import PolCounts from './PolCounts';
import UserSearchBar from './UserSearchBar';

class UserRMsTable extends RMTable {
  // Well this is an abuse of notation at the very least...
  sortKeys = [
      {key: 'close', label:'Closed'},
      {key: 'nom', label:'Nominated'},
      {key: 'vote', label:'Participated'},
      {key: 'all', label:'All'},
  ];

  get headings() {
    let extras  = [];
    if (this.state.sortKey === 'vote' | this.state.sortKey === 'all') {
      extras = [RM_COLS.vote];
    }
    return this.base_headings.concat(extras);
  }

  get defaultSortKey() {
    return 'all';
  }

  rows_api_call() {
    return api.user_rms(this.props.username, this.state.n, 
        this.state.sortKey);
  }
}

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: {},
      polcounts: {},
      loaded: false,
    };
  }

  get username() {
    return dp.urldecode_user(this.props.match.params.username);
  }

  fetchStats() {
    api.user_stats(this.username).then(dat => {
      this.setState({activity: dat.activity, 
        polcounts:dat.polcounts,
        loaded: true,
      });
    });
  }

  componentDidMount() {
    this.fetchStats();
  }

  render() {
    if (!this.state.loaded) {
      return <h1>RM stats for user {this.username}</h1>;
    } else if (this.state.loaded && this.state.activity.all === 0) {
      return this.render_nouser();
    } else {
      return this.render_extant();
    }
  }

  render_nouser() {
    return (
      <section>
        <h1>User {this.username} not found</h1>
        <UserSearchBar />
      </section>
    );
  }

  render_extant() {
    const act = this.state.activity;
    return (
    <section>
      <h1>RM stats for user {this.username}</h1>
      <p>{this.username} has participated in {act.all} RMs:
      </p>
      <ul>
        <li>{act.noms.toLocaleString()} nominations</li>
        <li>{act.closes.toLocaleString()} closes</li>
        <li>{act.votes.toLocaleString()} comments/!votes</li>
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

