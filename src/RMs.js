import React from 'react';

import RMTable from './RMTable';
import RMSearchBar from './RMSearchBar';
import * as api from './api_helpers';

class RMs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    this.sortKey = 'recent';
    this.n = 30;
  }

  componentDidMount() {
    this.fetchRows();
  }

  handleSortChange(evt) {
    this.sortKey = evt.target.value;
    this.fetchRows();
  }

  fetchRows() {
    api.fetch_rms(this.sortKey, this.n)
      .then(dat => {
        this.setState({rows: dat});
      });
  }
  
  render() {
    return (
      <section>
        <h1>RMs</h1>
        <RMSearchBar />
        <label>
          <input type="radio" value="recent"
            checked={this.sortKey==='recent'}
            onChange={this.handleSortChange.bind(this)} />
          Recent
        </label>
        <label>
          <input type="radio" value="big"
            checked={this.sortKey==='big'}
            onChange={this.handleSortChange.bind(this)} />
          Big
        </label>
        <h2>{this.sortKey} RMs</h2>
        <RMTable rowdat={this.state.rows} />
      </section>
    );
  }
}

export default RMs;

