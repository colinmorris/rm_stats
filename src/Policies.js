import React from 'react';

import TableWrapper from './BaseTable';
import PolRow from './PolRow';

class Policies extends React.Component {
  headings = ['Policy', 'Mentions'];

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    this.n = 30;
  }

  componentDidMount() {
    // XXX: This could be simplified using api_helpers
    var urlstr = window.location.origin + '/api/policies';
    var url = new URL(urlstr);
    var params = {n: this.n};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    var prom = window.fetch(url, {headers:{
      Accept: 'application/json'}});
    prom
      .then(resp => {
        if (!resp.ok) {
          console.error(resp);
        }
        return resp.json();
      })
      .then(dat => {
        this.setState({rows: dat});
      });
  }
  renderRow(row) {
    return <PolRow key={row.pol} {...row} />;
  }

  render() {
    const row_eles = this.state.rows.map(this.renderRow);
    return (
      <TableWrapper headings={this.headings}>
        {row_eles}
      </TableWrapper>
    );
  }
}

export default Policies;
