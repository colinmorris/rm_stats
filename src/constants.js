
export const PROD = process.env.NODE_ENV === 'production';
export const BASEURL = PROD ? '/rmstats' : '';
export const DEBUG = (!PROD) && true;

export const UNPARSEABLE_TITLE_PLACEHOLDER = '*UNK';

export const RM_COLS = {
  RM: 'RM',
  date: 'Date',
  outcome: 'Outcome',
  mentions: 'Mentions', // n mentions of a specific policy
  vote: '!Vote',
  size: 'Participants',
  comments: 'Comments',
};

export const DEFAULT_ROWS = 50;
export const DEFAULT_RM_ROWS = DEFAULT_ROWS;
// How many rows to add when clicking "show more"
export const DEFAULT_ROWS_PLUS = 50;
export const RM_ROW_PLUS = 50;

export const GITHUB_SITE_URL = "https://github.com/colinmorris/rm_stats";
export const GITHUB_SCRAPER_URL = "https://github.com/PLACEHOLDER";
