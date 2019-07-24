import React from 'react';

class User extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <h1>RM stats for user {this.username}</h1>
      <p>{this.username} has participated in {0} RMs:
      </p>
      <ul>
        <li>{} nominations</li>
        <li>{} closes</li>
        <li>{} comments/!votes</li>
      </ul>
      <p>Their most cited policies are: TODO</p>
      <h2>Recent RMs</h2>
      <!-- TODO: Links to load these as separate pages? -->
      <h3>As participant</h3>
      <h3>As nominator</h3>
      <h3>As closer</h3>
      );
  }
}

export default User;

