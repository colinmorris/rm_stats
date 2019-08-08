
export default class TimelineLayoutArtist {
  constructor() {
    // x position of next placed element (as left boundary)
    this.x = this.xmargin;
    // y posn of next placed element (as center)
    this.y = this.ymargin + this.base_radius;
  }

  /* Allocate space for given event, and return its coordinate info.
  */
  alloc_event(evt) {
    let r = this.base_radius;
    const coords = {
      cx: this.x+r,
      cy: this.y,
      r: r,
    };
    this.x += r*2;
    return coords;
  }

  alloc_connector(dur) {
    let snakelen = this.xscale_event_interval(dur);
    const coords = {
      x1: this.x,
      y1: this.y,
      len: snakelen,
    };
    this.x += snakelen;
    return coords;
  }

  get width() {
    // idk
    return 600;
  }

  get height() {
    return 300;
  }

  get max_radius() {
    return this.base_radius;
  }

  get xmargin() {
    return 10;
  }
  get ymargin() {
    return 10;
  }
  get base_radius() {
    return 50;
  }

  xscale_event_interval(days) {
    return days * .5;
  }

}
