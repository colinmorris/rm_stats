import React from 'react';

const OUTCOMES = {
  moved: 'yes',
  notmoved: 'no',
  nc: 'nc',
  unknown: 'unk',
};

const PATTERNS = {
  moved: ['moved', 'page moved', 'consensus to move', 'move', 'move all',
    'moved as proposed', 'pages moved', 'done', 'moved as requested',
    'moved all', 'moved per request',
    ],
  notmoved: ['not moved', 'consensus against',
    'withdrawn', 'withdrawn by nominator',
    'page not moved', 'no move',
    ],
  nc: ['no consensus', 'no consensus to move', 'no consensus at this time',
    'no consensus for move',
    ],
};

export class Outcome {
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
    norm = norm.replace(/\[\[([^\|\]]+?)\]\]/, '$1')
    // piped wikilinks
    norm = norm.replace(/\[\[[^\]\|]*\|([^\]]*)\]\]/, '$1')
    norm = norm.replace(/^[']+/, '').replace(/['.]+$/, '');
    return norm;
  }

  get outcome() {
    let norm = this.normalized;
    for (let key of Object.keys(PATTERNS)) {
      for (let patt of PATTERNS[key]) {
        if (norm === patt) {
          return OUTCOMES[key];
        }
      }
    }
    return OUTCOMES.unknown;
  }

  classNames() {

  }
}
