import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './main.css';
import './pseudo_vector.css';
import octocat from './octocat.svg';

import Policy from './Policy';
import Policies from './Policies';
import RMs from './RMs';
import RMSearch from './RMSearch';
import Users from './Users';
import User from './User';
import About from './About';
import * as constants from './constants';

class NavHeader extends React.Component {

  render() {
    return (
      <nav className="navbar">
        <ul className="nav">
          <li className="nav-item"><Link to="/rms" className="nav-link">RMs</Link></li>
          <li className="nav-item"><Link to="/users" className="nav-link">Users</Link></li>
          <li className="nav-item">
            <Link to="/policies" className="nav-link">Policies</Link>
          </li>

          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>
        <a title="rm_stats project on GitHub" className="octo"
          href={constants.GITHUB_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img alt="octocat" src={octocat} />
          <span>/rm_stats</span>
        </a>
      </nav>
    );
  }
}

function App() {
  // Would like to have a 'Home' component with some kind of overall dashboard
  // or landing page. But I don't want to put in the work.
  return (
    <Router basename={constants.BASEURL}>
    <NavHeader />
      <div className="main-content">
        <Route exact path="/" component={RMs} />
        <Route path="/policies/:pol" component={Policy} />
        <Route exact path="/policies" component={Policies} />
        <Route exact path="/rms" component={RMs} />
        <Route path="/rms/search" component={RMSearch} />
        <Route exact path="/users" component={Users} />
        <Route path="/users/:username" component={User} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}

export default App;
