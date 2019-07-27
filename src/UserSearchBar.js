import React from 'react';
import { Redirect } from 'react-router';

import * as disp from './display_helpers';

export default class UserSearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {redirect:false};
  }

  render() {
    if (this.state.redirect) {
      const userquery = document.getElementById("userlookup").value;
      return <Redirect to={disp.user_link(userquery)} />;
    }
    return (
      <form>
        <input id="userlookup" type="search" />
        <button onClick={(evt) => {
          evt.preventDefault();
          this.setState({redirect: true});
        }}>
          User lookup
        </button>
      </form>
    );
  }
}
