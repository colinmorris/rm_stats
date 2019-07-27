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
    const qargs = {q: query};
    if (cs === true) {
      qargs.case = '1';
    }
    var loc = build_url('/rms/search', qargs);
    this.props.history.push(loc);
  }

  render() {
    return (
        <form className="searchform">
          <input id="searchField" type="search"
            defaultValue={this.props.query}
          />
          <button className="btn-search"
            onClick={this.doSearch}>Search</button>
          <label>
            <input id="caseSensitiveBox" type="checkbox"
              checked={this.props.case_sensitive === true}
              onChange={this.doSearch}
            />
          Case-sensitive
          </label>
        </form>
      );
  }
}

export default withRouter(RMSearchBar);

