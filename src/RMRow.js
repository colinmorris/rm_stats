import React from 'react';

import './Row.css';

import { RM_COLS } from './constants';

const RARROW = '→';
class RMRow extends React.Component {

  get rm_link() {
    return 'https://en.wikipedia.org/wiki/' + this.props.rm_link;
  }

  renderCol(col) {
    var meat;
    const dat = this.props.dat;
    switch (col) {
      case RM_COLS.RM:
        meat = (<a href={this.rm_link}>
            {dat.from_title} {RARROW} {dat.to_title}</a>);
        break;
      case RM_COLS.date:
        meat = dat.close_date;
        break;
      case RM_COLS.outcome:
        meat = dat.outcome;
        break;
      case RM_COLS.size:
        //meat = `${dat.n_participants-1} participants, ${dat.n_comments} comments`;
        meat = dat.n_participants-1;
        break;
      case RM_COLS.mentions:
        meat = dat.n_mentions;
        break;
      default:
        console.error("Unrecognized RM table heading: "+col);
    }
    return meat;
  }

  render() {
    var cells = this.props.headings.map(heading => {
        return <td key={heading}>{this.renderCol(heading)}</td>});
    return <tr>{cells}</tr>;
  }
  
  __render() {
    return (
      <tr>
        <td><a href={this.rm_link}>
          {this.props.from_title} {RARROW} {this.props.to_title} 
        </a></td>

        <td>
          {this.props.close_date}
        </td>

        <td>
          {this.props.polcounts}
        </td>
      </tr>
      );
  }

  _render() {
    return (
      <tr>
        <td><a href={this.rm_link}>
          {this.props.from_title}  
        </a></td>
        
        <td><a href={this.rm_link}>
          {RARROW}
        </a></td>

        <td><a href={this.rm_link}>
          {this.props.to_title}
        </a></td>

        <td>
          {this.props.close_date}
        </td>

        <td>
          {this.props.polcounts}
        </td>
      </tr>
      );
  }

}
export default RMRow;
