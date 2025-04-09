import React from 'react'
import { Router, Switch, Link } from 'react-router-dom'
import { FaroRoute } from '@grafana/faro-react'

import Home from './Home'
import About from './About'
import Contact from './Contact'
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const App: React.FC = () => {

  return (
    <Router history={history}>
      <nav>
        <ul style={{ display: 'flex', gap: '1rem' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Switch>
        <FaroRoute exact path="/" component={Home} />
        <FaroRoute path="/about" component={About} />
        <FaroRoute path="/contact" component={Contact} />
      </Switch>
    </Router>
  )
}

export default App
