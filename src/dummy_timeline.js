import { timeline } from './timeline.js';

const dummyEvents = [
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
];
export const dummyTimeline = new timeline(dummyEvents);
