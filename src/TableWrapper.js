import React from 'react';

import TableExpander from './TableExpander';

class TableWrapper extends React.Component {
  
  render() {
    const headercells = this.props.headings.map( (label, i) => 
        <th key={label} className={label}>{label}</th>
    );
    return (
    <div className="table-container">
      <table>
        <thead><tr>{headercells}</tr></thead>
        <tbody>
          {this.props.children}
        </tbody>
      </table>
      {this.props.expandable &&
        <TableExpander onExpand={this.props.onExpand} />
      }
    </div>
    );
  }
}

export default TableWrapper;
