import React from 'react';

import TableWrapper from './TableWrapper';
import { DEFAULT_ROWS, DEFAULT_ROWS_PLUS } from './constants';

/* Subclasses must at minimum implement/define:
   - rows_api_call()
   - renderRow()
   - headings
(RMTable implements the second, and provisionally, the third)

May also implement/override:
- sortKeys / defaultSortKey
- apiSensitiveStateVars
- shouldRefetchRows (see RMSearch)
*/
class APITableMixin extends React.Component {
  /* Mapping from identifier (used internally, and probably in API request)
     to text to use as label.
  */
  sortKeys = new Map([]);
  // If any of these state variables changes, our API results (this.state.rows)
  // are stale.
  apiSensitiveStateVars = ['n', 'sortKey'];

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      n : DEFAULT_ROWS,
      sortKey : this.defaultSortKey,
    };
    this.onExpand = this.onExpand.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  // Need to implement as a getter rather than a class field so that subclass
  // implementation is accessible from base class constructor.
  get defaultSortKey() {
    return undefined;
  }

  onExpand() {
    this.setState(state => {
      return {n: state.n + DEFAULT_ROWS_PLUS};
    });
  }

  handleSortChange(evt) {
    this.setState({sortKey: evt.target.value});
  }

  componentDidMount() {
    this.updateRowFetch();
  }

  shouldRefetchRows(prevProps, prevState) {
    let changed = stateKey => (this.state[stateKey] !== prevState[stateKey]);
    return this.apiSensitiveStateVars.some(stateKey => changed(stateKey));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.shouldRefetchRows(prevProps, prevState)) {
      this.updateRowFetch();
    }
  }

  updateRowFetch() {
    this.rows_api_call().then(dat => {
      this.setState({rows: dat});
    });
  }

  renderRow() {
    console.error("Abstract method not implemented.");
  }

  renderSortControls() {
    if (this.sortKeys.size === 0) {
      return;
    }
    const radios = Array.from(this.sortKeys).map( kv => {
      const key=kv[0], label=kv[1];
      return (
      <div key={key} className="form-check form-check-inline">
        <input className="form-check-input" type="radio"
          value={key} id={'sortradio-'+key}
          checked={this.state.sortKey===key}
          onChange={this.handleSortChange}
        />
        <label className="form-check-label" htmlFor={'sortradio-'+key}>
          {label}
        </label>
      </div>
    )});

    return (
      <form>{radios}</form>
    );
  }

  renderTable() {
    const trs = this.state.rows.map( (row) => this.renderRow(row));
    return (
    <>
      {this.renderSortControls()}
      <TableWrapper headings={this.headings} onExpand={this.onExpand}
        expandable={this.state.rows.length === this.state.n}
      >
        {trs}
      </TableWrapper>
    </>
    );
  }

  render() {
    return this.renderTable();
  }
}

export default APITableMixin;
