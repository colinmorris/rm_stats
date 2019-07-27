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
  sortKeys = [
    // key is used as value for the sortKey state variable
    //{ label: 'Most floozles', key: 'floozle', 
    //  title: 'Sort by floozles (not counting flozles)'}, ...
  ];
  // If any of these state variables changes, our API results (this.state.rows)
  // are stale.
  apiSensitiveStateVars = ['n', 'sortKey'];

  /* Seems like there's a bit of a design issue with the variables above (and
  the checkboxes/defaultSortKey getters). The getters and 'class fields'
  syntax above relate to setting *instance variables*. 
  But semantically, they're more like class variables. But if I use the static
  modifier when setting them, the subclass's version isn't visible in the base
  class (APITableMixin) constructor, which is a big problem. Not sure what the 
  cleaner solution would be. 'higher order components'? This new Hooks thing?
  */

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      n : DEFAULT_ROWS,
      sortKey : this.defaultSortKey,
    };
    for (let cb of this.checkboxes) {
      this.state[cb.statevar] = cb.initialValue;
      if (!cb.apiInsensitive) {
        this.apiSensitiveStateVars.push(cb.statevar);
      }
    }
    this.onExpand = this.onExpand.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  get checkboxes() {
    /* Similar to sortKeys above, but trying to make it a bit more generic this
       time.
    return [
      {
        label: 'Foozle', 
        statevar: 'foo', // corresponding state var, i.e. this.state.foo
        initialValue: true,
        // default false. If explicitly set to true, then a change to this 
        // variable should *not* force an API refetch.
        apiInsensitive: true,
      },
    ];
    */
    return [];
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

  renderControls() {
    return (<>
        {this.renderSortControls()}
        {this.renderCheckboxes()}
        </>);
  }

  renderCheckboxes() {
    if (this.checkboxes.length === 0) {
      return;
    }
    const boxes = this.checkboxes.map( cb => {
      const key=cb.statevar, label=cb.label;
      return (
      <div key={key} className="form-check form-check-inline">
        <input className="form-check-input" type="checkbox"
          value={key} id={'cb-'+key}
          checked={this.state[key]}
          onChange={(evt) => {
            this.setState({[key]: evt.target.checked});
          }}
        />
        <label className="form-check-label" htmlFor={'cb-'+key}>
          {label}
        </label>
      </div>
    )});

    return (
      <>{boxes}</>
    );
  }

  renderSortControls() {
    if (this.sortKeys.length === 0) {
      return;
    }
    const radios = this.sortKeys.map( sk => {
      const key=sk.key, label=sk.label, title=sk.title;
      return (
      <div key={key} className="form-check form-check-inline">
        <input className="form-check-input" type="radio"
          value={key} id={'sortradio-'+key}
          checked={this.state.sortKey===key}
          onChange={this.handleSortChange}
        />
        <label className="form-check-label" htmlFor={'sortradio-'+key}
          title={title}
        >
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
      {this.renderControls()}
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
