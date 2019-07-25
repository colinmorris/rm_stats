import React from 'react';

import RMRow from './RMRow';
import { RM_COLS } from './constants';
import APITableMixin from './APITable';

class RMTable extends APITableMixin {
  base_headings = [RM_COLS.RM, RM_COLS.date, RM_COLS.outcome,
    RM_COLS.size,
  ];
  // subclasses can override this
  extra_headings = [];

  get headings() {
    return this.base_headings.concat(this.extra_headings);
  }

  renderRow(dat) {
    return <RMRow key={dat.rm_id} headings={this.headings} dat={dat} />;
  }
}

export default RMTable;
