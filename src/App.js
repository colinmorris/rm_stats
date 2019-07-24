import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//import './App.css';
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
        <ul>
          <li><Link to="/rms">RMs</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li>
            <Link to="/policies">Policies</Link>
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
      <div>
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
