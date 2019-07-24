import React from 'react';
import { withRouter } from 'react-router';

import { build_url } from './api_helpers';

class RMSearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.doSearch = this.doSearch.bind(this);
  }

  doSearch(evt) {
    evt.preventDefault();
    const query = document.getElementById("searchField").value;
    const cs = document.getElementById("caseSensitiveBox").checked;
    console.log('cs=', cs);
    // XXX TODO: sanitize query string
    //var loc = '/rms/search?q=' + query;
    const qargs = {q: query};
    if (cs === true) {
      qargs.case = '1';
    }
    var loc = build_url('/rms/search', qargs);
    console.log('Moving to ' + loc);
    this.props.history.push(loc);
  }

  render() {
    return (
        <form>
          <input id="searchField" type="search"
            defaultValue={this.props.query}
          />
          <label>
            <input id="caseSensitiveBox" type="checkbox"
              checked={this.props.case_sensitive === true}
              onChange={this.doSearch}
            />
          Case-sensitive
          </label>
          <button onClick={this.doSearch}>Search</button>
        </form>
      );
  }
}

export default withRouter(RMSearchBar);

