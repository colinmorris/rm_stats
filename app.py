import flask
from flask import request, json, abort

from db import PandasDB

db = PandasDB()

app = flask.Flask(__name__)

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

def df_response(df):
  return app.response_class(
      response=df.to_json(orient='records'),
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
  if 'n' in request.args:
    n = int(request.args['n'])
  else:
    n = None
  print("Getting {} rms for pol={!r}".format(n, pol))
  dat = db.rms_for_policy(pol, n=n)
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
