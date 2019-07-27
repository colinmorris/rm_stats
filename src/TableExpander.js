import React from 'react';

class TableExpander extends React.Component {

  render() {
    return (
        <button type="button" className="btn btn-primary btn-lg expander"
          onClick={this.props.onExpand}
        >
          Show More
        </button>
        );
  }
}

export default TableExpander;
