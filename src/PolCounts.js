import React from 'react';

import * as dp from './display_helpers';

import './polcounts.css';

class PolCounts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
    this.limit = 15;
    this.collapse = this.collapse.bind(this);
    this.expand = this.expand.bind(this);
  }

  collapse() {
    this.setState({expanded: false});
  }
  expand() {
    this.setState({expanded: true});
  }

  render() {
    // Sort in descending order of count
    var lis = Object.entries(this.props.counts)
      .sort( (a, b) => b[1] - a[1])
      .map(ent => {
      let pol=ent[0], count=ent[1];
      return (<li key={pol}>
          {dp.render_pol_link(pol)}
          ×
          {count}
          </li>);
    });
    var resizer = '';
    if (this.state.expanded) {
      resizer = <button onClick={this.collapse}>-</button>;
    } else if (this.limit < Object.keys(this.props.counts).length) {
      lis = lis.slice(0, this.limit);
      resizer = <button onClick={this.expand}>+</button>;
    }
    return (
      <div>
      <ul className="horiz">
        {lis}
      </ul>{resizer}
      </div>
      );
  }
}

export default PolCounts;
