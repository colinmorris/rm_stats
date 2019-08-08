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
function generate_dummies(n) {
  let res = [
  {type: 'creation', to_title: 'Dummy -1'},
  ];
  for (let i=0; i < n; i++) {
    res.push({
      type: 'rm', from_title: res[res.length-1].to_title,
      to_title: 'Dummy '+i, moved: true,
    });
  }
  return res;
}

dummyEvents = generate_dummies(15);

export const dummyTimeline = new timeline(dummyEvents);
