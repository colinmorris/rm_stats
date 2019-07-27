import React from 'react';

import RMRow from './RMRow';
import { RM_COLS, DEBUG } from './constants';
import { is_malparsed } from './field_parsers';
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
    // Don't render badly misparsed RMs unless in debug mode.
    // XXX: This could cause confusion in some cases. e.g. in the user lookup
    // view, we could say this user participated in 5 RMs, but only show 4.
    if (!DEBUG && is_malparsed(dat)) {
      return;
    }
    const key = dat.rm_id + (dat.role ? dat.role : '');
    return <RMRow key={key} headings={this.headings} dat={dat} />;
  }
}

export default RMTable;
