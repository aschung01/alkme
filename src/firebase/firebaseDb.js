import { db, auth } from './initFirebase';

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

export const checkFriendGenderMatch = async (username, gender) => {
  const uid = await getUidByUsername(username);
  const friendGender = await db
    .ref('users/' + uid + '/gender')
    .once('value')
    .then((snapshot) => snapshot.val());
  return friendGender === gender;
};

const getUidByUsername = (username) =>
  db
    .ref('users')
    .orderByChild('username')
    .equalTo(username)
    .once('value')
    .then((snapshot) => Object.keys(snapshot.val())[0]);

export const getEnrollUsersValue = async (userInfo, matchInfo) => {
  const usersValue = [
    { uid: auth.currentUser.uid, username: userInfo.username },
  ];

  for (let i = 0; i < matchInfo.friendUsernameData.length; i++) {
    const friendUid = await getUidByUsername(
      matchInfo.friendUsernameData[i].label
    );
    usersValue.push({
      uid: friendUid,
      username: matchInfo.friendUsernameData[i].label,
    });
  }

  return usersValue;
};

export const updateDbEnrolledMatchLists = async (
  usersValue,
  userInfo,
  matchInfo
) => {
  const userEnrolledMatchData = {
    matchType: matchInfo.matchType,
    users: usersValue,
    availableDates: matchInfo.availableDates,
    matchAgeRange: matchInfo.ageRange,
    matchUniversities: matchInfo.matchUniversities,
  };

  const enrolledMatchList = `type${matchInfo.matchType}${
    userInfo.gender === '남성' ? 'Male' : 'Female'
  }EnrolledMatchList`;

  const newEnrolledMatchKey = db.ref().child(enrolledMatchList).push().key;
  const usersEnrolledMatchListUpdates = {};
  const enrolledMatchListUpdates = {};
  for (let i = 0; i < usersValue.length; i++) {
    usersEnrolledMatchListUpdates[
      usersValue[i].uid + '/' + newEnrolledMatchKey
    ] = userEnrolledMatchData;
  }
  enrolledMatchListUpdates[newEnrolledMatchKey] = userEnrolledMatchData;

  db.ref('usersEnrolledMatchList').update(usersEnrolledMatchListUpdates);
  db.ref(enrolledMatchList).update(enrolledMatchListUpdates);
};

export const getMatchEnrollAvailableList = async (usersValue) => {
  const usersEnrollAvailableList = [];
  const length = usersValue.length;

  for (let i = 0; i < length; i++) {
    const valAvailable = await db
      .ref('usersEnrolledMatchList/' + usersValue[i].uid)
      .once('value')
      .then((snapshot) => snapshot.val() === null);
    usersEnrollAvailableList.push(valAvailable);
  }

  return usersEnrollAvailableList;
};

export const checkFriendEnrollAvailable = async (username) => {
  const uid = await getUidByUsername(username);
  const friendEnrollAvailable = await db
    .ref('usersEnrolledMatchList/' + uid)
    .once('value')
    .then((snapshot) => {
      return snapshot.val() === null;
    });
  return friendEnrollAvailable;
};

export const checkUserMatchEnrollAvailable = () =>
  db
    .ref('usersEnrolledMatchList/' + auth.currentUser.uid)
    .once('value')
    .then((snapshot) => snapshot.val() === null);

export const updateDbInputFeedback = (feedback) => {
  const uid = auth.currentUser.uid;
  const feedbackData = {
    uid: uid,
    feedback: feedback,
  };

  return db.ref('feedbacks').push(feedbackData);
};
