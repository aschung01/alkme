import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Landing } from '../containers/landing/landing.js';
import {Register } from '../containers/register/register.js'
import Home from '../containers/home/home.js';
import Match from '../containers/match/match.js';
import { Login } from '../containers/login/login.js';

function App(props) {
  const { state, dispatch } = props;

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/match">
            <Match
              matchPage={state.matchPage}
              matchPageFriendUsername={state.matchPageFriendUsername}
              matchConditions={state.matchConditions}
              matchInfo={state.matchInfo}
              dispatch={dispatch}
            />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/register">
            <Register 
              registerPage={state.registerPage}
              registerPageEmail={state.registerPageEmail}
              registerPagePassword={state.registerPagePassword}
              registerPageUsername={state.registerPageUsername}
              registerPageUserInfo={state.registerPageUserInfo}
              registerInfo={state.registerInfo}
              dispatch={dispatch}
            />
          </Route>
          <Route path="/login">
            <Login 
              loginPage={state.loginPage}
              dispatch={dispatch}
            />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
