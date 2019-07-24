import React from 'react';

class TableWrapper extends React.Component {
  
  render() {
    const headercells = this.props.headings.map( (label, i) => 
        <th key={label}>{label}</th>
    );
    return (
      <table>
        <thead><tr>{headercells}</tr></thead>
        <tbody>
          {this.props.children}
        </tbody>
      </table>
      );

  }
}

export default TableWrapper;
