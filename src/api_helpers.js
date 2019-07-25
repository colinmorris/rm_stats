
export function build_url(base, querystring_params) {
  // transform boolean values to 0/1
  const qparams = Object.fromEntries(
      Object.entries(querystring_params).map( ent => {
        let k = ent[0], v = ent[1];
        return [k, ((typeof(v)==='boolean') ? (v ? '1' : '0') : v)];
      })
    );
  var usp = new URLSearchParams(qparams);
  var qs = usp.toString();
  return base + (qs && '?') + qs;
}

function api(endpoint, qargs) {
  if (!endpoint.startsWith('/')) {
    endpoint = '/' + endpoint;
  }
  var urlstr = window.location.origin + '/api' + endpoint;
  const url = build_url(urlstr, qargs);
  var prom = window.fetch(url, {headers:{
      Accept: 'application/json'}})
    .then(resp => resp.json());
  return prom;
}

export function fetch_rms_for_policy(pol, n) {
  return api('policy/'+pol, {n:n});
}

export function fetch_rms(sortKey, n) {
  const qargs = {n: n};
  var endpoint;
  if (sortKey === 'recent') {
    endpoint = 'rms/recent';
  } else if (sortKey === 'big') {
    endpoint = 'rms/big';
  } else {
    console.error("Unrecognized sort key: " + sortKey);
  }
  return api(endpoint, qargs);
}

export function search_rms(query, n, case_sensitive) {
  const qargs = {n: n, query: query, case:case_sensitive};
  return api('rms/search', qargs);
}

export function top_users(sortKey, n) {
  const qargs = {sort: sortKey, n: n};
  return api('users/top', qargs);
}

export function user_stats(user) {
  return api('user/stats', {user: user});
}

export function user_rms(user, n) {
  return api('user/rms', {user: user, n: n});
}

export function fetch_top_policies(n) {
  return api('policies', {n: n});
}
