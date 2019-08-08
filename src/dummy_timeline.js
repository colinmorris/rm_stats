import { timeline } from './timeline.js';

let dummyEvents = [
  {type: 'creation', to_title: 'Financial crisis of 2007-2008',
  },
  {type: 'rm', from_title:'Financial crisis of 2007-2008',
    to_title: 'Financial crisis of 2007-2009', moved: true,
  },
  {type: 'rm', from_title:'Financial crisis of 2007-2009',
    to_title:'Financial crisis (2007-present)', moved: false,
  },
  {type: 'rm', from_title:'Financial crisis of 2007-2009',
    to_title:'2008-2012 global financial crisis', moved: true,
  },
  {type: 'rm', from_title:'2008-2012 global financial crisis', 
    to_title: 'asdf',
    moved: false,
  },
];

function pseudo(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pseudo_range(seed, end) {
  let x = pseudo(seed);
  return Math.floor(x*end);
}
function pseudo_choice(seed, arr) {
  return arr[pseudo_range(seed, arr.length)];
}


function generate_dummies(n) {
  let cand_titles = ['Chairman', 'Chairperson', 'Chair (official)',
    'Chair (officer)', 'Chairman', 'Chairperson', 'Chair (position)',
    'Chair (presiding officer)',
  ];
  let curr_title = pseudo_choice(-1, cand_titles);
  let res = [
  {type: 'creation', to_title: curr_title},
  ];
  for (let i=0; i < n; i++) {
    let next_title = pseudo_choice(i, cand_titles);
    let succ = pseudo(i) > .5;
    res.push({
      type: 'rm', from_title: curr_title,
      to_title: next_title, moved: succ,
    });
    if (succ) {
      curr_title = next_title;
    }
  }
  return res;
}

dummyEvents = generate_dummies(15);

export const dummyTimeline = new timeline(dummyEvents);
