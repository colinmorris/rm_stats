import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './main.css';
import Home from './Home';
import Policy from './Policy';
import Policies from './Policies';
import RMs from './RMs';
import RMSearch from './RMSearch';
import Users from './Users';
import User from './User';

class NavHeader extends React.Component {

  render() {
    return (
      <nav>
        <ul className="nav">
          <li className="nav-item"><Link to="/rms" className="nav-link">RMs</Link></li>
          <li className="nav-item"><Link to="/users" className="nav-link">Users</Link></li>
          <li className="nav-item">
            <Link to="/policies" className="nav-link">Policies</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

function App() {
  return (
    <Router>
    <NavHeader />
      <div className="main-content">
        <Route exact path="/" component={Home} />
        <Route path="/policies/:pol" component={Policy} />
        <Route exact path="/policies" component={Policies} />
        <Route exact path="/rms" component={RMs} />
        <Route path="/rms/search" component={RMSearch} />
        <Route exact path="/users" component={Users} />
        <Route path="/users/:username" component={User} />
      </div>
    </Router>
  );
}

export default App;
