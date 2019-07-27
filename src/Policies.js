import React from 'react';

import APITableMixin from './APITable';
import PolRow from './PolRow';
import * as api from './api_helpers';

class Policies extends APITableMixin {
  headings = ['Shortcut', 'Mentions', 'Policy'];

  get checkboxes() {
    return [
      {statevar: 'collapse',
        label: 'Combine aliases',
        initialValue: true,
      },
    ];
  }

  rows_api_call() {
    return api.fetch_top_policies(this.state.n, this.state.collapse);
  }

  renderRow(row) {
    return <PolRow key={row.pol || row.canon} dat={row} />;
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
