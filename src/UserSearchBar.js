import React from 'react';
import { withRouter } from 'react-router';

import * as disp from './display_helpers';

class UserSearchBar extends React.Component {

  render() {
    return (
      <form className="searchform">
        <input id="userlookup" type="search" />
        <button className="btn-search"
          onClick={(evt) => {
          evt.preventDefault();
          const userquery = document.getElementById("userlookup").value;
          this.props.history.push(disp.user_link(userquery));
        }}>
          User lookup
        </button>
      </form>
    );
  }
}

export default withRouter(UserSearchBar);
