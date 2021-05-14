import { db } from './initFirebase';
import {currentUser} from './firebaseAuth'

export const registerUserInfo = (uid, userInfo) =>
  db.ref('users').child(uid).set(userInfo);

export const checkAvailableEmail = (email) =>
  db
    .ref('users')
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(function (snapshot) {
      return snapshot.val() === null;
    });

export const checkAvailableUsername = (username) =>
  db
    .ref('users')
    .orderByChild('username')
    .equalTo(username)
    .once('value')
    .then(function (snapshot) {
      return snapshot.val() === null;
    });

export const checkFriendUsernameAvailable = (username) =>
  db
    .ref('users')
    .orderByChild('username')
    .equalTo(username)
    .once('value')
    .then(function (snapshot) {
      return snapshot.val() !== null;
    });

export const updateUserMatchInfo = (matchInfo) => {
  if (currentUser)
    db.ref('usersMatchInfo').child(currentUser.uid).set(matchInfo);
  else console.log('User not logged in');
};

export const getCurrentUsername = (user) => {
  if (user)
  db.ref('users').child(user.uid).child('username').once('value').then((snapshot) => snapshot.val())
};
