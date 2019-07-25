import React from 'react';

import TableWrapper from './TableWrapper';
import { DEFAULT_ROWS, DEFAULT_ROWS_PLUS } from './constants';

/* Subclasses must at minimum implement/define:
   - rows_api_call()
   - renderRow()
   - headings

May also implement/override:
- sortKeys / defaultSortKey
*/
class APITableMixin extends React.Component {
  /* Mapping from identifier (used internally, and probably in API request)
     to text to use as label.
  */
  sortKeys = new Map([]);
  defaultSortKey = undefined;

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    /* I remember having a good reason for making these regular attrs rather
    than being part of state. But I can't quite remember what it was anymore...
    Oh, no, I remember. So, if a form element was interacted with, that would 
    fire a callback, and that callback would call setState to modify this.state.n
    or this.state.sortKey or whatever. Then it would fire an API request. And that
    API request would use this.state.n/this.state.sortKey, which would *still have
    their old values*.

    Is a better solution to fire the API call in componentDidUpdate()?

    Based on this: https://reactjs.org/docs/thinking-in-react.html
    it seems like I should be doing the opposite of this. i.e. n and sortKey
    are state, and rows is not (because it can be computed based on other 
    state/props). Buuut, if this.rows isn't state (or a prop), then changing it
    won't fire a component update!
    
    */
    this.n = DEFAULT_ROWS;
    this.sortKey = this.defaultSortKey;

    this.onExpand = this.onExpand.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  onExpand() {
    this.n += DEFAULT_ROWS_PLUS;
    this.updateRowFetch();
  }

  handleSortChange(evt) {
    this.sortKey = evt.target.value;
    this.updateRowFetch();
  }

  componentDidMount() {
    this.updateRowFetch();
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
    const radios = this.sortKeys.entries().map( (key, label) => (
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio"
          value={key} id={'sortradio-'+key}
          checked={this.sortKey===key}
          onChange={this.handleSortChange}
        />
        <label className="form-check-label" htmlFor={'sortradio-'+key}>
          {label}
        </label>
      </div>
    ));

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
        expandable={this.state.rows.length === this.n}
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
