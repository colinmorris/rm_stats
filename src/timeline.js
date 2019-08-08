function pseudo(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export class timeline {
  constructor(evts) {
    this.events = evts;
  }

  days_after_evt(idx) {
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
