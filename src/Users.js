import React from 'react';

import TableWrapper from './BaseTable';
import * as api from './api_helpers';
import * as disp from './display_helpers';

class Users extends React.Component {
  headings = ['User', 'Votes', 'Nominations', 'Closes', 'Total'];

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    this.sortKey = 'all';
    this.n = 30;
    this.handleSortChange = this.handleSortChange.bind(this);
    this.doLookup = this.doLookup.bind(this);
  }

  componentDidMount() {
    this.fetchRows();
  }
  
  handleSortChange(evt) {
    this.sortKey = evt.target.value;
    this.fetchRows();
  }

  fetchRows() {
    api.top_users(this.sortKey, this.n)
      .then(dat => { this.setState({rows: dat}); });
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
    const sortkeys_and_labels = [
      ['votes', '!Votes'],
      ['noms', 'Nominations'],
      ['closes', 'Closes'],
      ['all', 'All'],
    ];
    const radios = sortkeys_and_labels.map(pair => {
      let key = pair[0], label = pair[1];
      return (
        <label key={key}>
          <input type="radio" value={key}
            checked={this.sortKey===key}
            onChange={this.handleSortChange} />
          {label}
        </label>
        );
    });
    const row_eles = this.state.rows.map(this.renderRow);
    return (
    <section>
      <h1>Users</h1>
      <form>
          <input id="userlookup" type="search" />
        <button onClick={this.doLookup}>User lookup</button>
      </form>
      <h2>Most active users</h2>
      <form>
        <p>Sort by...</p>
        {radios}
      </form>
      <TableWrapper headings={this.headings}>
        {row_eles}
      </TableWrapper>
    </section>
      );
  }
}

export default Users;


