import React from 'react';

import APITableMixin from './APITable';
import UserSearchBar from './UserSearchBar';
import * as api from './api_helpers';
import * as disp from './display_helpers';

class Users extends APITableMixin {
  headings = ['User', 'Votes', 'Nominations', 'Closes', 'Total'];
  sortKeys = new Map([
    ['votes', '!Votes'],
    ['noms', 'Nominations'],
    ['closes', 'Closes'],
    ['all', 'All'],
  ]);

  get defaultSortKey() {
    return 'all';
  }

  rows_api_call() {
    return api.top_users(this.state.sortKey, this.state.n);
  }

  renderRow(row) {
    return (
      <tr key={row.user}>
        <td>{disp.render_user(row.user)}</td>
        <td>{row.votes}</td>
        <td>{row.noms}</td>
        <td>{row.closes}</td>
        <td>{row.all}</td>
      </tr>
      );
  }

  render() {
    return (
    <section>
      <h1>Users</h1>
      <UserSearchBar />
      <h2>Most active users</h2>
      {this.renderTable()}
    </section>
      );
  }
}

export default Users;


