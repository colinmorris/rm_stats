import React from 'react';

import RMTable from './RMTable';
import * as api from './api_helpers';

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
      <RMTable extra_headings={['Mentions']} rowdat={this.state.rows} />
      </section>
      );
  }


}

export default Policy;

