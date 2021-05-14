import { auth } from './initFirebase';
import { getCurrentUsername, registerUserInfo } from './firebaseDb';

export const currentUser = auth.currentUser;

export const currentUsername = auth.onAuthStateChanged(user => getCurrentUsername(user));

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
