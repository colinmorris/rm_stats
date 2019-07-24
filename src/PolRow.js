import React from 'react';
import { Link } from 'react-router-dom';

class PolRow extends React.Component {

  get pol_link() {
    return 'https://en.wikipedia.org/wiki/' + this.props.pol;
  }

  render() {
    return (
      <tr>
        <td><a href={this.pol_link}>
          {this.props.pol}
        </a></td>

        <td><Link to={`/policies/${this.props.pol}`}>
          {this.props.n}
        </Link></td>
      </tr>
      );
  }

}
export default PolRow;
