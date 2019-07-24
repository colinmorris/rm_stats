import React from 'react';

import RMRow from './RMRow';
import { RM_COLS } from './constants';
import TableWrapper from './BaseTable';

/** Potential headings:
  - RM (fromto/link)
  - Date (of close)
  - n mentions (pol lookup only)
  - policy count map
  - size cols:
    - n comments
    - n participants
    - n bytes
  - nominator
  - closer
  - outcome
**/
class RMTable extends React.Component {
  base_headings = [RM_COLS.RM, RM_COLS.date, RM_COLS.outcome,
    RM_COLS.size,
  ];
  static defaultProps = {
    extra_headings: [],
  };

  get headings() {
    return this.base_headings.concat(this.props.extra_headings);
  }

  renderRow(dat) {
    return <RMRow key={dat.rm_id} headings={this.headings} dat={dat} />;
  }

  render() {
    const trs = this.props.rowdat.map( (row) => this.renderRow(row));
    return (
      <TableWrapper headings={this.headings}>
        {trs}
      </TableWrapper>
      );
  }
}

export default RMTable;
