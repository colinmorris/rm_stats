import pandas as pd
import os

class PandasDB(object):
  DEFAULT_BASEDIR = './datasets'
  def __init__(self, basedir=None):
    if basedir is None:
      basedir = self.DEFAULT_BASEDIR
    load = lambda name: pd.read_csv(os.path.join(basedir, name+'.csv'))
    self.rms = load('rms')\
        .rename(columns={'id': 'rm_id'})\
        .sort_values(by='close_date', ascending=False)
    self.votes = load('votes')
    self.pols = load('pols')
    self.scs = load('shortcuts')

    polcounts = self.pols.groupby(['rm_id', 'pol'])['n'].sum().reset_index()
    # Used in the rms_for_policy endpoint
    self.pol_rms = polcounts.merge(self.rms, on='rm_id')
    canons = pd.merge(self.pols, self.scs, 
        on='pol',
        suffixes=('', '_sc'),
    )
    canoncounts = canons.groupby(['rm_id', 'canon'])['n'].sum().reset_index()
    self.canon_rms = canoncounts.merge(self.rms, on='rm_id')
    for df in (self.pol_rms, self.canon_rms):
      df['relevance'] = df['n'] / (df['n_comments']+4)

    user_to_ncloses = self.rms.groupby('closer').size()
    user_to_nnoms = self.rms.groupby('nominator').size()
    user_to_nvotes = self.votes.groupby('user').size()
    self.user_activity = pd.concat(
        [user_to_nvotes, user_to_nnoms, user_to_ncloses],
        axis=1, sort=True,
    ).fillna(0)
    self.user_activity.columns = ['votes', 'noms', 'closes']
    self.user_activity['all'] = self.user_activity.sum(axis=1)

  def top_policies(self, n, collapse):
    if collapse:
      counts = self.scs.groupby(['canon', 'expanded'])['n'].sum()\
          .reset_index()
    else:
      counts = self.scs
    #counts = self.pols.groupby('pol')['n'].sum().sort_values(ascending=False)
    return counts\
      .sort_values(by='n', ascending=False)\
      .head(n)

  def user_exists(self, user):
    return user in self.user_activity.index

  # TODO: wrapper for translating returned df to something more digestible
  def rms_for_policy(self, pol, n, sort, collapse=True):
    assert sort in ('recent', 'big', 'mentions', 'relevance'), sort
    if collapse:
      canon = self.get_canon_shortcut(pol)
      df = self.canon_rms[self.canon_rms.canon==canon]
    else:
      df = self.pol_rms[self.pol_rms.pol==pol]
    if sort == 'recent':
      df = df.sort_values(by='close_date', ascending=False)
    elif sort == 'big':
      df = df.sort_values(by='n_participants', ascending=False)
    elif sort == 'mentions':
      df = df.sort_values(by='n', ascending=False)
    elif sort == 'relevance':
      df = df.sort_values(by='relevance', ascending=False)
    return df\
        .rename(columns={'n': 'n_mentions'})\
        .head(n)

  def get_canon_shortcut(self, pol):
    return self.scs[self.scs.pol==pol].iloc[0].canon

  def get_rms(self, sort, n):
    assert sort in ('big', 'recent', 'random'), sort
    if sort == 'random':
      return self.rms.sample(n)
    else:
      sort_to_col = dict(big='n_comments', recent='close_date')
      return self.rms.sort_values(by=sort_to_col[sort], ascending=False).head(n)

  def search_rms(self, query, n, case_sensitive):
    ix = (
        (self.rms.from_title.str.contains(query, case=case_sensitive))
        | (self.rms.to_title.str.contains(query, case=case_sensitive))
    )
    return self.rms.loc[ix].head(n)

  def top_users(self, sort, n):
    assert sort in self.user_activity.columns, "sort key {!r} not in cols: {}".format(
        sort, self.user_activity.columns)
    return self.user_activity.sort_values(by=sort, ascending=False)\
        .head(n)\
        .reset_index()\
        .rename(columns={'index': 'user'})

  def rms_involving_user(self, user, n, role):
    assert role in ('all', 'vote', 'nom', 'close'), role
    if role == 'nom':
      df = self.rms[self.rms.nominator==user].copy()
      df['role'] = 'nom'
      df['vote'] = None
    elif role == 'close':
      df = self.rms[self.rms.closer==user].copy()
      df['role'] = 'close'
      df['vote'] = None
    elif role == 'vote':
      df = self.votes.loc[self.votes.user==user, ['vote', 'rm_id']
          ].merge(self.rms, on='rm_id',
      )
      df['role'] = 'vote'
    else:
      noms = self.rms[self.rms.nominator==user].copy()
      noms['role'] = 'nom'
      closes = self.rms[self.rms.closer==user].copy()
      closes['role'] = 'close'

      votes = self.votes.loc[self.votes.user==user, ['vote', 'rm_id']
          ].merge(self.rms, on='rm_id',
      )
      votes['role'] = 'vote'

      df = pd.concat([noms, closes, votes], sort=False)
    return df.sort_values(by='close_date', ascending=False).head(n)

  def activity_counts_for_user(self, user):
    """Given a username, return a dict with counts of how many RMs
    they've participated in as: commenter, nominator, closer.
    """
    return self.user_activity.loc[user]

  def polcounts_for_user(self, user):
    return self.pols[self.pols.user == user].groupby('pol')['n'].sum()

