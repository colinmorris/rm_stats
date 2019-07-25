import React from 'react';

class TableExpander extends React.Component {

  render() {
    return (
        <button type="button" className="btn"
          onClick={this.props.onExpand}
        >
          Show More
        </button>
        );
  }
}

export default TableExpander;
