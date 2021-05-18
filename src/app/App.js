import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Landing } from '../containers/landing/landing.js';
import { Register } from '../containers/register/register.js';
import { Home } from '../containers/home/home.js';
import Match from '../containers/match/match.js';
import { Login } from '../containers/login/login.js';
import {
  onAuthStateChanged,
  loginActionCreator,
  logoutActionCreator,
  getCurrentUserInfo,
} from '../firebase/firebaseAuth.js';
import { getUserInfoFromDb } from '../firebase/firebaseDb';

export const App = (props) => {
  const { state, dispatch } = props;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginActionCreator());
        getUserInfoFromDb(user).then((userInfo) =>
          dispatch(getCurrentUserInfo(userInfo))
        );
      } else {
        dispatch(logoutActionCreator());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/match" currentUserInfo={state.currentUserInfo}>
            <Match
              matchPage={state.matchPage}
              matchPageFriendUsername={state.matchPageFriendUsername}
              matchConditions={state.matchConditions}
              matchInfo={state.matchInfo}
              dispatch={dispatch}
            />
          </PrivateRoute>
          <PrivateRoute path="/home" currentUserInfo={state.currentUserInfo}>
            <Home currentUserInfo={state.currentUserInfo} />
          </PrivateRoute>
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
            <Login loginPage={state.loginPage} dispatch={dispatch} />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const PrivateRoute = ({ children, currentUserInfo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        currentUserInfo.loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
};
