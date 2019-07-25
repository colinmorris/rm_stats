import React from 'react';

import RMTable from './RMTable';
import * as api from './api_helpers';
import { RM_COLS } from './constants';

class Policy extends RMTable {
  extra_headings = [RM_COLS.mentions];

  get polname() {
    return this.props.match.params.pol;
  }

  rows_api_call() {
    return api.fetch_rms_for_policy(this.polname, this.n);
  }

  render() {
    return (
      <section>
        <h1>RM discussions invoking {this.polname}</h1>
        {this.renderTable()}
      </section>
      );
  }

}

export default Policy;

