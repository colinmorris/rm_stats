
export default class TimelineLayoutArtist {
  constructor() {
    // x position of next placed element (as left boundary)
    this.x = this.xmargin;
    // y posn of next placed element (as center)
    this.y = this.ymargin + this.base_radius;
    // current direction. 1 = left-to-right. -1 = right-to-left.
    this.dir = 1;
  }

  /* Allocate space for given event, and return its coordinate info.
  */
  alloc_event(evt, expanded) {
    let r = expanded ? this.max_radius : this.base_radius;
    const coords = {
      cx: this.x+r*this.dir,
      cy: this.y,
      r: r,
    };
    this.x += r*2*this.dir;
    return coords;
  }

  alloc_connector(dur) {
    let snakelen = this.xscale_event_interval(dur);
    // as the bird flies
    if (this.has_room_to_grow(this.x+snakelen*this.dir)) {
      // XXX: extending the connector under the node (up to the center) is a bit of 
      // a hack around the fact that it seems like we can't transition line coords
      // with css.
      const coords = {
        x1: this.x - this.base_radius*this.dir,
        y1: this.y,
        x2: this.x + (snakelen*this.dir) + this.base_radius*this.dir,
        y2: this.y,
      };
      this.x += snakelen*this.dir;
      return coords;
    }
    // Okay, we're going to have to wind around to the next line. As the snake crawls.
    return this.alloc_hinge(snakelen);
  }

  alloc_hinge(len) {
    let total = len;
    // We'll try to make the top handle as long as possible. This is our ideal 
    // top handle length (setting the bot handle as small as possible)
    let handle_length = (len - this.lineheight) - this.hinge_minhandle;
    // If the maximum top handle length doesn't even reach the minimum, bump it up
    if (handle_length < this.hinge_minhandle) {
      console.warn(`Extending total hinge length from ${len} to ${this.min_hingelength}`);
      handle_length = this.hinge_minhandle;
      total = this.min_hingelength;
    }
    // Also, the top handle can't be so long it overflows the x max
    const max_handle = this.xroom;
    if (handle_length > max_handle) {
      handle_length = max_handle;
    }
    // XXX: Theoretically possible that we would need to do a DOUBLE hinge if
    // dur is really long, but... let's not worry about that for now.
    const bottom_handle = total - (handle_length + this.lineheight);
    // The rightmost point (if we're ltr)
    const furthest = this.x + handle_length*this.dir;
    const next_y = this.y + this.lineheight;
    const x2 = furthest - bottom_handle*this.dir;
    const coords = {
      x1: this.x - this.base_radius*this.dir,
      y1: this.y,
      top_hinge: {
        x: furthest,
        y: this.y,
      },
      bottom_hinge: {
        x: furthest,
        y: next_y,
      },
      x2: x2 - this.base_radius*this.dir,
      y2: next_y,
    };
    this.y = next_y;
    this.x = x2;
    this.dir *= -1;
    return coords;
  }

  get hinge_minhandle() {
    return 10;
  }
  // Minimum total line length for a hinge (if we don't want the event to occur
  // midway between lines)
  get min_hingelength() {
    return this.lineheight + 2*this.hinge_minhandle;
  }

  // How much room is left to grow on the current line
  get xroom() {
    return this.xmax - this.x;
  }

  has_room_to_grow(x) {
    if (this.dir === 1) {
      return (x+this.max_radius*2) <= (this.width-this.xmargin);
    } else {
      return (x-this.max_radius*2) >= this.xmin;
    }
  }

  get xmax() {
    return this.width - this.xmargin;
  }
  get xmin() {
    return this.xmargin;
  }

  get width() {
    // idk
    return 800;
  }

  get height() {
    return this.y + this.max_radius + this.ymargin + this.line_ymargin;
  }

  get line_ymargin() {
    return 30;
  }
  get lineheight() {
    // TODO: Not right. Need to account for text size... I guess line_ymargin can
    // kind of account for that?
    return this.max_radius*2 + this.line_ymargin;
  }

  get max_radius() {
    return this.base_radius * 1.25;
  }

  get xmargin() {
    return 10;
  }
  get ymargin() {
    return 10;
  }
  get base_radius() {
    return 20;
  }

  xscale_event_interval(days) {
    return days * .6;
  }

}
