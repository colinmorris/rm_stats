import React from 'react';

import APITableMixin from './APITable';
import PolRow from './PolRow';
import * as api from './api_helpers';

class Policies extends APITableMixin {
  headings = ['Policy', 'Mentions'];

  rows_api_call() {
    return api.fetch_top_policies(this.n);
  }

  renderRow(row) {
    return <PolRow key={row.pol} {...row} />;
  }

  render() {
    return (
      <section>
        <h1>Most cited policy shortcuts</h1>
        {this.renderTable()}
      </section>
    );
  }
}

export default Policies;
