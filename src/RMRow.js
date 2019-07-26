import React from 'react';

import './Row.css';

import { RM_COLS, DEBUG } from './constants';
import * as fields from './field_parsers';

const RARROW = '→';
class RMRow extends React.Component {

  get rm_link() {
    return 'https://en.wikipedia.org/wiki/' + this.props.dat.rm_link;
  }

  renderCol(col) {
    var meat, extra_attrs = {};
    // zz hack
    var classes = [col.replace('!', '')];
    const dat = this.props.dat;
    switch (col) {
      case RM_COLS.RM:
        meat = (<span>
            <a href={this.rm_link}>
            {dat.from_title} {RARROW} {dat.to_title || '?'}</a>
            {dat.n_articles > 1 && 
              <small className="multimove-indicator"
                title={`This RM involved ${dat.n_articles} total renames`}>
                +{dat.n_articles-1}
              </small>
            }
            </span>
            );
        break;
      case RM_COLS.date:
        meat = dat.close_date.split(' ')[0];
        break;
      case RM_COLS.outcome:
        const outcome = new fields.Outcome(dat.outcome);
        meat = outcome.cleaned;
        if (DEBUG) {
          extra_attrs.title = dat.outcome;
        }
        classes.push('outcome-' + outcome.outcome);
        break;
      case RM_COLS.size:
        //meat = `${dat.n_participants-1} participants, ${dat.n_comments} comments`;
        meat = dat.n_participants-1;
        break;
      case RM_COLS.mentions:
        meat = dat.n_mentions;
        break;
      case RM_COLS.vote:
        classes.push('role-'+dat.role);
        if (dat.role === 'nom') {
          meat = 'Nominator';
        } else if (dat.role === 'close') {
          meat = 'Closer';
        } else {
          const vote = new fields.Vote(dat.vote);
          meat = vote.cleaned;
          classes.push('vote-' + vote.vote);
          if (DEBUG) {
            extra_attrs.title = dat.vote;
          }
        }
        break;
      case RM_COLS.comments:
        meat = dat.n_comments;
        break;
      default:
        console.error("Unrecognized RM table heading: "+col);
    }
    return (<td key={col} className={classes.join(' ')}
          {...extra_attrs}
        >
        {meat}
        </td>);
  }

  render() {
    var cells = this.props.headings.map(this.renderCol.bind(this));
    return <tr>{cells}</tr>;
  }

}
export default RMRow;
