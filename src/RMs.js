import React from 'react';

import RMTable from './RMTable';
import RMSearchBar from './RMSearchBar';
import * as api from './api_helpers';
import { RM_COLS, DEFAULT_RM_ROWS, RM_ROW_PLUS } from './constants';

class RMs extends RMTable {
  sortKeys = new Map([
      ['big', 'Big'],
      ['recent', 'Recent'],
  ]);
  defaultSortKey = 'recent';

  // Overriding RMTable implementation, which assumes a static list of 
  // extra_headings for the class.
  get headings() {
    let hd = this.base_headings;
    if (this.state.sortKey === 'big') {
      hd = hd.concat( [RM_COLS.comments] );
    }
    return hd;
  }

  rows_api_call() {
    return api.fetch_rms(this.state.sortKey, this.state.n);
  }
  
  render() {
    return (
      <>
        <h1>RMs</h1>
        <RMSearchBar />
        <h2>{this.sortKey} RMs</h2>
        {this.renderTable()}
      </>
    );
  }
}

export default RMs;

