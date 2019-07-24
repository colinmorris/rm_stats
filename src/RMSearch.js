import React from 'react';

import RMSearchBar from './RMSearchBar';
import RMTable from './RMTable';
import * as api from './api_helpers';

class RMSearch extends React.Component {
  // this.props.location.query.foo

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    this.n = 30;
    console.log(this.props);
  }

  get qStringParams() {
    return new URLSearchParams(this.props.location.search);
  }

  get query() {
    return this.qStringParams.get('q');
    let params = new URLSearchParams(this.props.location.search);
    //return this.props.location.query.q;
    return params.get('q');
  }

  get case_sensitive() {
    return this.qStringParams.get('case') === '1';
  }

  fetch() {
    if (!this.query) {
      this.setState({rows: []});
      return;
    }
    api.search_rms(this.query, this.n, this.case_sensitive).then(dat => {
      this.setState({rows: dat});
    });
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      console.log("Detected change to query string. Fetching new results.");
      this.fetch();
    }
  }

  render() {
    return (
      <section>
        <h1>RM Search</h1>
        <RMSearchBar query={this.query} 
          case_sensitive={this.case_sensitive}
        />
        <RMTable rowdat={this.state.rows} />
      </section>
      );
  }
}

export default RMSearch;


