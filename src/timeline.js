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
}
