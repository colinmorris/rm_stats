import React from 'react';

import BaseTable from './BaseTable';
import PolRow from './PolRow';

class Policies extends BaseTable {
  headings = ['Policy', 'Mentions'];

  componentDidMount() {
    var urlstr = window.location.origin + '/api/policies';
    var url = new URL(urlstr);
    var params = {n: this.state.n};
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
}

export default Policies;
