import React from 'react';
import { Link } from 'react-router-dom';

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

export function render_user(user) {
  return <Link to={'/users/'+urlencode_user(user)}>{user}</Link>;
}
