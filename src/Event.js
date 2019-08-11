import React from 'react';

const wrap = (s, w) => s.replace(
  new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n'
);


export default class TimelineEvent extends React.Component {

  render_to_title() {
    let tt = this.props.evt.to_title;
    if (tt === null) {
      return <tspan dy="1.1em">?</tspan>;
    }
    let wrapped = wrap(tt, 20);
    return wrapped.split('\n').map(chunk => (<tspan
          x={this.props.cx}
          dy="1.1em"
          key={chunk}
          >{chunk}</tspan>) );
  }

  points_in_circle(n) {
    let pts = [];
    let i = 0;
    while (pts.length < n && i < 1000) {
      let x = (this.pseudo()-.5)*2*this.props.r;
      let y = (this.pseudo()-.5)*2*this.props.r;
      if ( (x**2 + y**2)**.5 < this.props.r ) {
        pts.push({x: this.props.cx+x, y:this.props.cy+y});
      }
      i += 1;
    }
    return pts;
  }

  pseudo() {
    let x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }


  render_votes() {
    const evt = this.props.evt;
    const votes = evt.votes;
    if (votes === undefined) {
      // Actually this is expected in specifically the case of the creation evt.
      console.warn("votes was undefined");
      return;
    }
    this.seed = votes.other + 17*votes.supp + 31*votes.opp;
    const pts = this.points_in_circle(votes.other+votes.supp+votes.opp);
    let dots = [];
    for (let i=0; i < pts.length; i++) {
      let vote = i < votes.other ? 'other' : 
        (i < votes.other+votes.supp ? 'supp' : 'opp');
      let pt = pts[i];
      dots.push(
        <circle
          key={i}
          className={"vote "+vote}
          cx={pt.x}
          cy={pt.y}
        />
      );
    }
    return dots;
  }

  render() {
    return (
    <g
      onPointerEnter={ this.props.onEnter }
      className="Event"
    >
      <circle
        className="Event-node"
        cx={this.props.cx}
        cy={this.props.cy}
        r={this.props.r}
        stroke={this.props.title_color}
        fill='white'
      />
      {this.render_votes()}
      <text
        x={this.props.cx}
        y={this.props.cy+this.props.r+0}
        style={{fontSize: '9px'}}
      >
        {this.render_to_title()}
      </text>
    </g>
    );
  }
}

