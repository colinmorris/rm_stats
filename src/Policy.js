import React from 'react';

import RMTable from './RMTable';
import * as api from './api_helpers';
import { RM_COLS } from './constants';

class Policy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      n: 40,
    };
  }

  get polname() {
    return this.props.match.params.pol;
  }

  componentDidMount() {
    api.fetch_rms_for_policy(this.polname, this.state.n)
      .then(dat => {
        this.setState({rows: dat});
      });
  }

  render() {
    return (
      <section>
      <h1>RM discussions invoking {this.polname}</h1>
      <RMTable extra_headings={[RM_COLS.mentions]} rowdat={this.state.rows} />
      </section>
      );
  }


}

export default Policy;

