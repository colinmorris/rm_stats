import React from 'react';

import * as dp from './display_helpers';

class PolRow extends React.Component {

  get pol() {
    const dat = this.props.dat;
    return dat.pol || dat.canon;
  }

  get pol_link() {
    return 'https://en.wikipedia.org/wiki/' + this.pol;
  }

  render_expansion() {
    if (this.props.dat.expanded === null) {
      return (
          <a href={this.pol_link} className="redlink">
        {this.props.dat.pol}
          </a>
          );
    } else {
      const label = this.props.dat.expanded.replace(/^Wikipedia:/, '');
      return <a href={this.pol_link}>{label}</a>;
    }
  }

  render() {
    return (
      <tr>
        <td className="Shortcut">
          {dp.render_pol_link(this.pol)}
        </td>

        <td>
          {this.props.dat.n.toLocaleString()}
        </td>

        <td className="Policy">
          {this.render_expansion()}
        </td>
      </tr>
      );
  }

}
export default PolRow;
