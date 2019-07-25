import React from 'react';

import APITableMixin from './APITable';
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
  defaultSortKey = 'all';

  constructor(props) {
    super(props);
    this.doLookup = this.doLookup.bind(this);
  }

  rows_api_call() {
    return api.top_users(this.state.sortKey, this.state.n);
  }

  doLookup(evt) {
    evt.preventDefault();
    const query = document.getElementById("userlookup").value;
    var loc = disp.user_link(query)
    this.props.history.push(loc);
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
      <form>
          <input id="userlookup" type="search" />
        <button onClick={this.doLookup}>User lookup</button>
      </form>
      <h2>Most active users</h2>
      {this.renderTable()}
    </section>
      );
  }
}

export default Users;


