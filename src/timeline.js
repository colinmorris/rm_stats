import { Outcome } from './field_parsers';

function pseudo(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function timeline_from_rows(rows) {
  let evts = rows.map(row => ({
    type: 'rm',
    moved: new Outcome(row.outcome).outcome === 'yes',
    closedate: new Date(row.close_date),
    ...row
    })
  );
  // closedate = 2 mos earlier
  let pseudo_creation = {type:'creation',
    to_title: evts[0].from_title,
    closedate: new Date(evts[0].closedate.valueOf() - (1000*60*60*24*30*2)),
  };
  evts.splice(0, 0, pseudo_creation);
  return new timeline(evts);
}

export class timeline {
  constructor(evts) {
    this.events = evts;
  }

  days_after_evt(idx) {
    if (idx >= this.events.length-1) {
      return 0;
    }
    let a = this.events[idx].closedate, b = this.events[idx+1].closedate;
    return (b-a) / (1000 * 60 * 60 * 24);
    return (pseudo(idx)+.1) * 320;
  }

  // The article title as of the *end* of the ith event.
  title_as_of(idx) {
    let evt;
    for (let i=idx; i>=0; i--) {
      evt = this.events[i];
      if (evt.type === 'creation' || evt.moved === true) {
        return evt.to_title;
      }
    }
    console.error('Found no current title start from idx='+idx);
  }

  get all_titles() {
    let t = this.events.map(evt => evt.to_title);
    // will this give a deterministic order? I guess we'll see.
    return [...new Set(t)];
  }
}
