import flask
from flask import request, json, abort, render_template, send_from_directory
import os
import simplejson

from db import PandasDB

db = PandasDB()

app = flask.Flask(__name__, static_folder="build/static")

# Check whether we're running on toolforge.
PROD = os.path.exists('/etc/wmflabs-project')
if PROD:
  app.config['APPLICATION_ROOT'] = '/rmstats'

def get_n(default=15):
  if 'n' in request.args:
    return int(request.args['n'])
  print("WARNING: No n param found. Falling back to default value, {}".format(
    default))
  return default

def get_bool(qparam):
  val = request.args[qparam]
  assert val in ('0', '1'), val
  return val == '1'

def df_response(df, orient='records'):
  return app.response_class(
      response=df.to_json(orient=orient),
      mimetype='application/json',
      )
  
@app.route('/api/policies')
def policies():
  n = get_n()
  collapse = get_bool('collapse')
  dat = db.top_policies(n, collapse=collapse)
  #dat = dat.to_frame().reset_index()
  return app.response_class(
      response=dat.to_json(orient='records'),
      mimetype='application/json',
      )

@app.route('/api/policy/<string:pol>')
def policy(pol):
  n = get_n()
  sortkey = request.args['sort']
  dat = db.rms_for_policy(pol, n, sortkey)
  return app.response_class(
      response=dat.to_json(orient='records'),
      mimetype='application/json',
      )

@app.route('/api/rms')
def some_rms():
  n = get_n()
  sortkey = request.args['sort']
  df = db.get_rms(sortkey, n)
  return df_response(df)

@app.route('/api/rms/search')
def search_rms():
  n = get_n()
  query = request.args['query']
  case = request.args.get('case')
  case_sens = case == '1'
  print("Case sensitive = {} (case={!r}), query={}".format(
    case_sens, case, query))
  df = db.search_rms(query, n, case_sens)
  return df_response(df)

@app.route('/api/users/top')
def top_users():
  n = get_n()
  sortkey = request.args['sort']
  df = db.top_users(sortkey, n)
  return df_response(df)

@app.route('/api/user/rms')
def rms_for_user():
  n = get_n()
  user = request.args['user']
  # nvm, I can't figure out how to catch these client-side. Promises are hard. :|
  if False and not db.user_exists(user):
    abort(404)
  role = request.args['role']
  df = db.rms_involving_user(user, n, role)
  return df_response(df)

@app.route('/api/user/stats')
def stats_for_user():
  user = request.args['user']
  if not db.user_exists(user):
    #abort(404)
    obj = dict(
      activity = dict(
        all=0, noms=0, closes=0, votes=0,
        ),
      polcounts = {},
      )
  else:
    activity = db.activity_counts_for_user(user)
    policies = db.polcounts_for_user(user)
    obj = {
        'activity': activity.to_dict(),
        'polcounts': policies.to_dict(),
    }
  return app.response_class(
      response=json.dumps(obj),
      mimetype='application/json',
      )

@app.route('/api/articles')
def top_articles():
  n = get_n()
  sortkey = request.args['sort']
  df = db.top_articles(sortkey, n)
  return df_response(df)

@app.route('/api/articles/<string:article>')
def rms_for_article(article):
  n = get_n()
  sortkey = request.args['sort']
  df = db.rms_for_article(article, sortkey, n)
  return df_response(df)

@app.route('/api/timeline/<int:n>')
def nth_timeline(n):
  assert n > 0, n
  topn = db.top_articles('rms', n)
  article = topn.iloc[-1].article
  #rms = db.rms_for_article(article, 'recent', 100)
  #rms = rms[::-1]
  #return df_response(rms)
  evts = db.timeline_for_article(article)
  return app.response_class(
      response=simplejson.dumps(evts, ignore_nan=True),
      mimetype='application/json',
      )

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
   path_dir = os.path.abspath("./build") #path react build
   print(path)
   if path != "" and os.path.exists(os.path.join(path_dir, path)):
     return send_from_directory(os.path.join(path_dir), path)
   else:
     return send_from_directory(os.path.join(path_dir),'index.html')

if __name__ == '__main__':
  app.run(debug=not PROD)
