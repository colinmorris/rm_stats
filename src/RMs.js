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
  extra_headings = [];

  updateRowFetch() {
    return api.fetch_rms(this.sortKey, this.n);
  }
  
  render() {
    return (
      <>
        <h1>RMs</h1>
        <RMSearchBar />
        <label>
          <input type="radio" value="recent"
            checked={this.sortKey==='recent'}
            onChange={this.handleSortChange.bind(this)} />
          Recent
        </label>
        <label>
          <input type="radio" value="big"
            checked={this.sortKey==='big'}
            onChange={this.handleSortChange.bind(this)} />
          Big
        </label>
        <h2>{this.sortKey} RMs</h2>
        <RMTable rowdat={this.state.rows} 
          extra_headings={this.sortKey === 'big' ? [RM_COLS.comments] : []}
          onExpand={this.onExpand}
        />
      </>
    );
  }
}

export default RMs;

