import { createStore, combineReducers } from 'redux';
import {
  registerPageEmailReducer,
  registerPagePasswordReducer,
  registerPageReducer,
  registerPageUserInfoReducer,
  registerPageUsernameReducer
} from '../containers/register/registerSlice'
import {loginPageReducer} from '../containers/login/loginSlice'
import {
  matchPageReducer,
  matchPageFriendUsernameReducer,
  inputMatchConditionsReducer,
  inputMatchInfoReducer,
} from '../containers/match/matchSlice.js';
import {
  myInfoPageReducer,
  myInfoSettingsReducer
} from '../containers/my_info/myInfoSlice'
import { currentUserInfoReducer } from '../firebase/firebaseAuth';

export const store = createStore(
  combineReducers({
    currentUserInfo: currentUserInfoReducer,
    registerPage: registerPageReducer,
    registerPageEmail: registerPageEmailReducer,
    registerPagePassword: registerPagePasswordReducer,
    registerPageUsername: registerPageUsernameReducer,
    registerPageUserInfo: registerPageUserInfoReducer,
    loginPage: loginPageReducer,
    myInfoPage: myInfoPageReducer,
    myInfoSettings: myInfoSettingsReducer,
    matchPage: matchPageReducer,
    matchPageFriendUsername: matchPageFriendUsernameReducer,
    matchConditions: inputMatchConditionsReducer,
    inputMatchInfo: inputMatchInfoReducer,
  })
);
