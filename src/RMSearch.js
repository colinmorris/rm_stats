import React from 'react';

import RMSearchBar from './RMSearchBar';
import RMTable from './RMTable';
import * as api from './api_helpers';

/* A view showing RM search results and a search bar.
   /rms/search?q=

   The way this encodes some state in the query string (and sort of has some
   weird upward flow of state, via RMSearchBar navigating to a new location,
   thereby changing the props of its parent RMSearch), feels a little janky.
   Wonder what the approved way to do this is.
*/
class RMSearch extends RMTable {
  // nvm, keep case_sensitive as a pseudo (derived) property, and
  // override shouldRefetchRows()
  //apiSensitiveStateVars = ['n', 'sortKey', 'case_sensitive'];

  get qStringParams() {
    return new URLSearchParams(this.props.location.search);
  }

  get query() {
    return this.qStringParams.get('q');
  }

  get case_sensitive() {
    return this.qStringParams.get('case') === '1';
  }

  // Overriding APITableMixin implementation
  updateRowFetch() {
    if (!this.query) {
      this.setState({rows: []});
      return;
    }
    api.search_rms(this.query, this.state.n, this.case_sensitive).then(dat => {
      this.setState({rows: dat});
    });
  }

  shouldRefetchRows(prevProps, prevState) {
    return (prevProps.location.search !== this.props.location.search
        || super.shouldRefetchRows(prevProps, prevState)
    );
  }

  render() {
    return (
      <section>
        <h1>RM Search</h1>
        <RMSearchBar query={this.query} 
          case_sensitive={this.case_sensitive}
        />
        {this.renderTable()}
      </section>
      );
  }
}

export default RMSearch;


