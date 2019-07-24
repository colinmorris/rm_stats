import React from 'react';

class BaseTable extends React.Component {
  static defaultProps = {
    expandable: true,
    initial_size: 20
  }
  headings = ['Base', 'Table', 'Columns'];

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      n: props.initial_size
    };
  }

  componentDidMount() {
    // fire off API request
  }

  renderRow(row) {
  }

  render() {
    const headercells = this.headings.map( (label, i) => 
        <th key={i}>{label}</th>
    );
    const trs = this.state.rows.map( (row) => this.renderRow(row));
    return (
      <table>
        <thead><tr>{headercells}</tr></thead>
        <tbody>
          {trs}
        </tbody>
      </table>
      );

  }
}

export default BaseTable;
