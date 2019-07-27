import React from 'react';
import { Link } from 'react-router-dom';

import * as constants from './constants';

export default [
{heading: "What?", content: (<p>
A little web app for visualizing statistics related to <a href="https://en.wikipedia.org/wiki/Wikipedia:Requested_moves">requested moves</a> (RMs) on Wikipedia - i.e. formal discussions about renaming articles.
</p>),
},
{heading: "Why?", content: (<><p>
For fun! Though I also hope it might be a useful research tool to help inform ongoing move discussions. For example:</p>
<ul>
  <li>Suppose there's a move discussion between a title of the form "X Y" and "X Y controversy". It could be helpful to browse <Link to={"/rms/search?q=controversy"}>past RMs involving titles with the word "controversy"</Link> to see the arguments that were made there.
  </li>
  <li>In an RM that argues that "List of Presidents of Fooland" should be changed to "List of presidents of Fooland" per <a href="https://en.wikipedia.org/wiki/MOS:JOBTITLES">MOS:JOBTITLES</a>, it could be useful to see how <Link to={"/policies/MOS:JOBTITLES"}>that policy has been interpreted in previous RMs</Link>.
  </li>
</ul>
<p>This tool drew some inspiration from <a href="https://tools.wmflabs.org/afdstats/">AfD Stats</a>, though it doesn't have the same focus on measuring the 'accuracy' of individual users, in terms of matching consensus. (This would be harder to do for move discussions, because, compared to deletion discussions, there's a greater diversity of possible outcomes, and possible !votes.)
</p>
</>
),
},
{heading: "Who?", content: (<p>This tool was written by Colin Morris, aka <a href="https://en.wikipedia.org/wiki/User:Colin_M">User:Colin M</a> on Wikipedia. If you have feedback, feel free to leave me a note on <a href="https://en.wikipedia.org/wiki/User_talk:Colin_M">my talk page</a>.
    </p>),
},
{heading: "How?", content:(<><p>
The RM data was scraped via the MediaWiki API, and parsed using some kludgy heuristics implemented in Python. The scraping/parsing code is <a href={constants.GITHUB_SCRAPER_URL}>on GitHub here</a>. You may find that some RMs are missing, or have incorrect values for some fields. This is hard to avoid, given the huge variety of formatting and template usage in RMs through the ages. Even finding where one user's comment ends and a new one begins is extremely non-trivial!</p>
<p>So far only one scrape has been performed (around 2019-07-21), and the site will not be updated automatically with new RMs. If there's enough interest, I might try setting up some automation to rescrape periodically.</p>
<p>This site is coded with React, with an API written in Flask. The code is <a href={constants.GITHUB_SITE_URL}>on GitHub here</a>. Pull requests to either repository are extremely welcome!</p>
</>
), },
{heading: "Whence?", content:(<p>Did you really just say <i>whence</i>?</p>),
},
];
