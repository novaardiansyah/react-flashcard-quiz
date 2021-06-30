import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// contents
import Home from './contents'

export default function App() {
  return (
    <Router>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
