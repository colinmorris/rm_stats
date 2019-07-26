import React from 'react';

const OUTCOMES = {
  moved: 'yes',
  notmoved: 'no',
  nc: 'nc',
  unknown: 'unk',
};

const OUTCOME_PATTERNS = {
  moved: ['moved', 'page moved', 'consensus to move', 'move', 'move all',
    'moved as proposed', 'pages moved', 'done', 'moved as requested',
    'moved all', 'moved per request',
    ],
  notmoved: ['not moved', 
    'consensus against', 'consensus not to move', 'consensus against move',
    'withdrawn', 'withdrawn by nominator', 'withdrawn by nom',
    'page not moved', 'no move',
    ],
  nc: ['no consensus', 'no consensus to move', 'no consensus at this time',
    'no consensus for move',
    ],
};

class Comment {
  constructor(s) {
    this.str = s;
    // XXX: Hmmm. I guess this means outcome isn't parseable. Should probably
    // exclude this row then.
    if (this.str === null) {
      this.str = '';
    }
  }

  get normalized() {
    return this.cleaned.toLowerCase();
  }

  get cleaned() {
    let norm = this.str;
    // Replace wikilinks with their visible text.
    norm = norm.replace(/\[\[([^\|\]]+?)\]\]/g, '$1')
    // piped wikilinks
    norm = norm.replace(/\[\[[^\]\|]*\|([^\]]*)\]\]/g, '$1')
    norm = norm.replace(/^[']+/, '').replace(/['.;:]+$/, '');
    norm = norm.trim();
    return norm;
  }
}

export class Outcome extends Comment {
  get outcome() {
    let norm = this.normalized;
    for (let key of Object.keys(OUTCOME_PATTERNS)) {
      for (let patt of OUTCOME_PATTERNS[key]) {
        if (norm === patt) {
          return OUTCOMES[key];
        }
      }
    }
    return OUTCOMES.unknown;
  }
}

const VOTES = {
  support: 'supp',
  oppose: 'opp',
  weakSupport: 'weak-supp',
  weakOppose: 'weak-opp',
  strongSupport: 'strong-supp',
  strongOppose: 'strong-opp',
  comment: 'comment',
  neutral: 'neut',
  unknown: 'unk',
};

const VOTE_PATTERNS = {
  support: ['support', 'support as proposed', 'support all',
  ],
  oppose: ['oppose', 'oppose all',
  ],
  weakSupport: ['weak support',
  ],
  weakOppose: ['weak oppose',
  ],
  strongSupport: ['strong support',
  ],
  strongOppose: ['strong oppose',
  ],
  comment: ['comment',
  ],
  neutral: ['neutral',
  ],
};


export class Vote extends Comment {
  get vote() {
    let norm = this.normalized;
    for (let key of Object.keys(VOTE_PATTERNS)) {
      for (let patt of VOTE_PATTERNS[key]) {
        if (norm === patt) {
          return VOTES[key];
        }
      }
    }
    return VOTES.unknown;
  }
}
