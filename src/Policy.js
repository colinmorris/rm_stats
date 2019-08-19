import React from 'react';

import RMTable from './RMTable';
import * as api from './api_helpers';
import * as dp from './display_helpers';
import { RM_COLS } from './constants';

class Policy extends RMTable {
  extra_headings = [RM_COLS.mentions];
  sortKeys = [
    {label: 'Recent', key: 'recent', },
    {label: 'Popular', key: 'big', },
    {label: 'Mentions', key: 'mentions', 
      title: 'Sort by number of mentions of this policy',
    },
    {label: 'Relevance', key: 'relevance', 
      title: 'Sort by mentions, normalized by number of comments',
    },
  ];
  get defaultSortKey() { return 'recent'; }

  get polname() {
    return this.props.match.params.pol;
  }

  rows_api_call() {
    return api.fetch_rms_for_policy(this.polname, this.state.n, this.state.sortKey);
  }

  render() {
    return (
      <section>
        <h1>
        RM discussions invoking {dp.render_pol_wikilink(this.polname)}
        </h1>
        {this.renderTable()}
      </section>
      );
  }

}

export default Policy;

