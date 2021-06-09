import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { AdminHome } from '../containers/admin_home/admin_home';
import { DisplayUsersInfo } from '../containers/display_users_info/display_users_info'
import { DisplayFeedback } from '../containers/display_feedback/display_feedback'
import { DisplayCurrentMeetings } from '../containers/display_current_meetings/display_current_meetings'
import { DisplayPreviousMeetings } from '../containers/display_previous_meetings/display_previous_meetings'
import { DisplayWaitingMeetings } from '../containers/display_waiting_meetings/display_waiting_meetings'
import { Landing } from '../containers/landing/landing.js';
import { Register } from '../containers/register/register.js';
import { Home } from '../containers/home/home.js';
import Match from '../containers/match/match.js';
import { MyInfo } from '../containers/my_info/myInfo';
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
          <PrivateRoute path="/myInfo" currentUserInfo={state.currentUserInfo}>
            <MyInfo
              currentUserInfo={state.currentUserInfo}
              myInfoPage={state.myInfoPage}
              myInfoSettings={state.myInfoSettings}
              dispatch={dispatch}
            />
          </PrivateRoute>
          <PrivateRoute path="/match" currentUserInfo={state.currentUserInfo}>
            <Match
              matchPage={state.matchPage}
              matchPageFriendUsername={state.matchPageFriendUsername}
              matchConditions={state.matchConditions}
              inputMatchInfo={state.inputMatchInfo}
              dispatch={dispatch}
            />
          </PrivateRoute>
          <PrivateRoute path="/home" currentUserInfo={state.currentUserInfo}>
            {state.currentUserInfo.userInfo.admin === true ? (
              <AdminHome
                currentUserInfo={state.currentUserInfo}
                dispatch={dispatch}
              />
            ) : (
              <Home
                currentUserInfo={state.currentUserInfo}
                dispatch={dispatch}
              />
            )}
          </PrivateRoute>
          <AdminPrivateRoute
            path="/display_users_info"
            currentUserInfo={state.currentUserInfo}
          >
            <DisplayUsersInfo />
          </AdminPrivateRoute>
          <AdminPrivateRoute
            path="/display_feedback"
            currentUserInfo={state.currentUserInfo}
          >
            <DisplayFeedback />
          </AdminPrivateRoute>
          <AdminPrivateRoute
            path="/display_current_meetings"
            currentUserInfo={state.currentUserInfo}
          >
            <DisplayCurrentMeetings />
          </AdminPrivateRoute>
          <AdminPrivateRoute
            path="/display_previous_meetings"
            currentUserInfo={state.currentUserInfo}
          >
            <DisplayPreviousMeetings />
          </AdminPrivateRoute>
          <AdminPrivateRoute
            path="/display_waiting_meetings"
            currentUserInfo={state.currentUserInfo}
          >
            <DisplayWaitingMeetings />
          </AdminPrivateRoute>
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

const AdminPrivateRoute = ({ children, currentUserInfo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        currentUserInfo.loggedIn && currentUserInfo.userInfo.admin === true ? (
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
