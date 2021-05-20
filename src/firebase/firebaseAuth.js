import { auth } from './initFirebase';
import { registerUserInfo } from './firebaseDb';

export const onAuthStateChanged = (func) => {
  auth.onAuthStateChanged(func);
};

export const registerUser = (email, password, userInfo) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      var uid = user.uid;
      registerUserInfo(uid, userInfo);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });

export const loginUser = (email, password) =>
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      return true;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });

export const loginActionCreator = () => {
  return {
    type: 'currentUserInfo/login',
  };
};

export const logoutActionCreator = () => {
  return {
    type: 'currentUserInfo/logout',
  };
};

export const getCurrentUserInfo = (userInfo) => {
  return {
    type: 'currentUserInfo/getCurrentUserInfo',
    payload: userInfo,
  };
};

const initialState = {
  loggedIn: false,
  userInfo: {},
};

export const currentUserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'currentUserInfo/login':
      return {
        ...state,
        loggedIn: true,
      };
    case 'currentUserInfo/logout':
      return {
        ...state,
        loggedIn: false,
      };
    case 'currentUserInfo/getCurrentUserInfo':
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};
