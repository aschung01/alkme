import { createStore, combineReducers } from 'redux';
import {
  registerPageEmailReducer,
  registerPagePasswordReducer,
  registerPageReducer,
  registerPageUserInfoReducer,
  registerPageUsernameReducer
} from '../containers/register/registerSlice'
import { homePageReducer } from '../containers/home/homeSlice';
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
import { feedbackPageReducer } from '../containers/feedback/feedbackSlice';

export const store = createStore(
  combineReducers({
    currentUserInfo: currentUserInfoReducer,
    registerPage: registerPageReducer,
    registerPageEmail: registerPageEmailReducer,
    registerPagePassword: registerPagePasswordReducer,
    registerPageUsername: registerPageUsernameReducer,
    registerPageUserInfo: registerPageUserInfoReducer,
    loginPage: loginPageReducer,
    homePage: homePageReducer,
    myInfoPage: myInfoPageReducer,
    myInfoSettings: myInfoSettingsReducer,
    feedbackPage: feedbackPageReducer,
    matchPage: matchPageReducer,
    matchPageFriendUsername: matchPageFriendUsernameReducer,
    matchConditions: inputMatchConditionsReducer,
    inputMatchInfo: inputMatchInfoReducer,
  })
);
