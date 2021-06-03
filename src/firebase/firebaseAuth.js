import { auth, emailCredential } from './initFirebase';
import {
  registerUserInfo,
  updateDbUserEmail,
  updateDbUserPassword,
} from './firebaseDb';

export const user = auth.currentUser;

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

export const reauthenticateUser = (password) => {
  const credential = emailCredential(auth.currentUser.email, password);

  return auth.currentUser
    .reauthenticateWithCredential(credential)
    .then((userCredential) => {
      // Authenticated
      return true;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};

export const updateAuthUserEmail = (email, dispatch) =>
  auth.currentUser
    .updateEmail(email)
    .then(() => {
      updateDbUserEmail(auth.currentUser.uid, email);
      dispatch(updateCurrentUserEmail(email));
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });

export const updateAuthUserPassword = (password, dispatch) =>
  auth.currentUser
    .updatePassword(password)
    .then(() => {
      updateDbUserPassword(auth.currentUser.uid, password);
      dispatch(updateCurrentUserPassword(password));
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });

export const logout = () => auth.signOut();

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

const updateCurrentUserEmail = (email) => {
  return {
    type: 'currentUserInfo/updateCurrentUserEmail',
    payload: email,
  };
};

const updateCurrentUserPassword = (password) => {
  return {
    type: 'currentUserInfo/updateCurrentUserPassword',
    payload: password,
  };
};

export const updateCurrentUserUsername = (username) => {
  return {
    type: 'currentUserInfo/updateCurrentUserUsername',
    payload: username,
  };
};

export const updateCurrentUserGender = (gender) => {
  return {
    type: 'currentUserInfo/updateCurrentUserGender',
    payload: gender,
  };
};

export const updateCurrentUserUniversity = (university) => {
  return {
    type: 'currentUserInfo/updateCurrentUserUniversity',
    payload: university,
  };
};

export const updateCurrentUserAge = (age) => {
  return {
    type: 'currentUserInfo/updateCurrentUserAge',
    payload: age,
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
    case 'currentUserInfo/updateCurrentUserEmail':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          email: action.payload,
        },
      };
    case 'currentUserInfo/updateCurrentUserPassword':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          password: action.payload,
        },
      };
    case 'currentUserInfo/updateCurrentUserUsername':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          username: action.payload,
        },
      };
    case 'currentUserInfo/updateCurrentUserGender':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          gender: action.payload,
        },
      };
    case 'currentUserInfo/updateCurrentUserUniversity':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          university: action.payload,
        },
      };
    case 'currentUserInfo/updateCurrentUserAge':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          age: action.payload,
        },
      };
    default:
      return state;
  }
};
