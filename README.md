A web app for visualizing stats related to [requested moves](https://en.wikipedia.org/wiki/Wikipedia:Requested_moves) (RMs) on Wikipedia.

See the [wiki-controversial-titles](https://github.com/colinmorris/wiki-controversial-titles) repository for the code that scraped and parsed the data that gets visualized.

This repo contains client code, written with React (using [create-react-app](https://github.com/facebook/create-react-app)), and a simple API backend written with Flask.

## Running in development mode

Pre-requisites:
- `pip install -r requirements.txt`
- have node and npm installed (I'm using node v10.16.0, npm v6.9.0)
- `npm install`
- have the csv files produced by the [RM scraping/parsing code](https://github.com/colinmorris/wiki-controversial-titles/tree/master/rm_scraping) in `./datasets`. Necessary files are: pols.csv, rms.csv, shortcuts.csv, votes.csv. (If you'd like a copy of these files, file an issue and let me know - I'll be happy to upload them to archive.org or something)

Start the API server: `python3 -m flask run`

Start the js development server: `npm run start`

## Running in production

The production version of the site is served on Wikimedia's [Toolforge](https://wikitech.wikimedia.org/wiki/Portal:Toolforge) server, at [https://tools.wmflabs.org/rmstats/](https://tools.wmflabs.org/rmstats/)

In production, the Flask server (`app.py`) does double-duty, serving index.html and other static files, in addition to answering API calls under `/api/*`.

Pre-requisites (all these steps need to take place on Toolforge as the `rmstats` tool account):
- clone this repository at `/data/project/rmstats/www/python/src`
- set up a python virtualenv as described [here](https://wikitech.wikimedia.org/wiki/Help:Toolforge/My_first_Flask_OAuth_tool#Step_2:_Create_a_basic_Flask_WSGI_webservice) and `pip install -r requirements.txt`
- copy local `datasets/` to `/data/project/rmstats/www/python/src/`

### How it should work

```
$ npm run build
$ webservice --backend=kubernetes python3.5 start
```

In practice, the build command fails for utterly inscrutable reasons (`sh: 1: react-scripts: not found` - an error message with lots of google results, none of which really elucidate the cause of the problem, or offer a solution that worked for me). So instead...

### How it actually works

I maintain a parallel branch `site` in which the contents of the `build/` directory are checked in. Rather than building on the toolforge server, I build changes locally, push them to `site`, and work from that branch on the toolforge server. Yes, this is gross.
