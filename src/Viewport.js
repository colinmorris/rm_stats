import React from 'react';

import * as dp from './display_helpers';

export default class TimelineViewport extends React.Component {

  render_date(date) {
    return date.toLocaleDateString();
  }

  render_creation() {
    return (<>
      Article {dp.render_wiki_link(this.props.event.to_title)} created on {this.render_date(this.props.event.closedate)}.
    </>);
  }

  render_rm() {
    const evt = this.props.event;

    return (<>
      <p>On {this.render_date(evt.closedate)} it was proposed that <b>{evt.from_title}</b> be moved to <b>{evt.to_title}</b>.
      </p>
      <p><b>{evt.votes.supp}</b> users supported the move, <b>{evt.votes.opp}</b> users opposed. The closing outcome was: <b>{evt.outcome}</b>
      </p>
      <p>Link: {dp.render_wiki_link(evt.rm_link)}
      </p>
      <p className="debug">
        <b>DEBUG:</b>
        {JSON.stringify(evt)}
      </p>
    </>);
  }

  render() {
    if (!this.props.event) {
      return null;
    }
    return (
    <div className="viewport">
      {this.props.event.type === 'creation' ? this.render_creation() : this.render_rm()}
    </div>
    );
  }
}

