import React from 'react';
import { Link } from 'react-router-dom';

export function urlencode(s) {
  return s.replace(/ /g, '_');
}
export function urldecode(s) {
  return s.replace(/_/g, ' ');
}

export function urlencode_user(user) {
  return user.replace(/ /g, '_');
}
export function urldecode_user(user) {
  return user.replace(/_/g, ' ');
}

export function render_user_wikilink(user) {
  const user_link = 'https://en.wikipedia.org/wiki/User:' +
    urlencode_user(user);
  return <a href={user_link}>{user}</a>;
}

export function user_link(user) {
  return '/users/' + urlencode_user(user);
}

export function render_user(user) {
  return <Link to={user_link(user)}>{user}</Link>;
}

export function render_pol_wikilink(pol) {
  const url = 'https://en.wikipedia.org/wiki/' + pol;
  return <a href={url}>{pol}</a>;
}
export function render_pol_link(pol) {
  return <Link to={'/policies/'+pol}>{pol}</Link>;
}
export function render_article_link(article) {
  const enc = urlencode(article);
  return <Link to={'/articles/'+enc}>{article}</Link>;
}
export function wikilink(pg) {
  return 'https://en.wikipedia.org/wiki/' + urlencode(pg);
}
export function render_wiki_link(pg) {
  const enc = urlencode(pg), dec = urldecode(pg);
  const url = 'https://en.wikipedia.org/wiki/' + enc;
  return <a href={url}>{dec}</a>;
}
