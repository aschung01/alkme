import { db, auth } from './initFirebase';
import { onAuthStateChanged } from './firebaseAuth';

export const registerUserInfo = (uid, userInfo) =>
  db.ref('users').child(uid).set(userInfo);

export const updateDbUserEmail = (uid, email) => {
  db.ref('users').child(uid).child('email').set(email);
};

export const updateDbUsername = (username) => {
  db.ref('users').child(auth.currentUser.uid).child('username').set(username);
};

export const updateDbUserGender = (gender) => {
  db.ref('users').child(auth.currentUser.uid).child('gender').set(gender);
};

export const updateDbUserUniversity = (university) => {
  db.ref('users')
    .child(auth.currentUser.uid)
    .child('university')
    .set(university);
};

export const updateDbUserAge = (age) => {
  db.ref('users').child(auth.currentUser.uid).child('age').set(age);
};

export const updateDbUserPassword = (uid, password) => {
  db.ref('users').child(uid).child('password').set(password);
};

export const getUserInfoFromDb = (user) =>
  db
    .ref('users')
    .child(user.uid)
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });

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
    })
    .catch((e) => {
      console.log(e.message);
      console.log(e.code);
    });

export const updateUserMatchInfo = (matchInfo) => {
  onAuthStateChanged((user) => {
    if (user) db.ref('usersMatchInfo').child(user.uid).set(matchInfo);
  });
};

export const updateInputFeedbackDb = (feedback) => {
  const uid = auth.currentUser.uid;
  const feedbackData = {
    uid: uid,
    feedback: feedback,
  };

  return db.ref('feedbacks').push(feedbackData);
};
