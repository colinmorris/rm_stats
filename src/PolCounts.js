import React from 'react';

import * as dp from './display_helpers';

class PolCounts extends React.Component {

  render() {
    // Sort in descending order of count
    const lis = Object.entries(this.props.counts)
      .sort( (a, b) => b[1] - a[1])
      .map(ent => {
      let pol=ent[0], count=ent[1];
      return (<li key={pol}>
          {dp.render_pol_link(pol)}
          ×
          {count}
          </li>);
    });
    return (
      <ul>
        {lis}
      </ul>
      );
  }
}

export default PolCounts;
