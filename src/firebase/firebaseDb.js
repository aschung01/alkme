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

const getInfoByUid = (uid, info) =>
  db
    .ref('users/' + uid + '/' + info)
    .once('value')
    .then((snapshot) => snapshot.val());

export const getEnrollUsersValue = async (userInfo, matchInfo) => {
  const usersValue = [
    {
      uid: auth.currentUser.uid,
      username: userInfo.username,
      gender: userInfo.gender,
      age: userInfo.age,
      university: userInfo.university,
    },
  ];

  for (let i = 0; i < matchInfo.friendUsernameData.length; i++) {
    const friendUid = await getUidByUsername(
      matchInfo.friendUsernameData[i].label
    );
    const friendAge = await getInfoByUid(friendUid, 'age');
    const friendUniversity = await getInfoByUid(friendUid, 'university');
    const friendGender = await getInfoByUid(friendUid, 'gender');
    usersValue.push({
      uid: friendUid,
      username: matchInfo.friendUsernameData[i].label,
      gender: friendGender,
      age: friendAge,
      university: friendUniversity,
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

export const getEnrolledMatchListFromDb = async () => {
  const maleEnrolledMatchList = [];
  const femaleEnrolledMatchList = [];
  const admin = await db
    .ref('users/' + auth.currentUser.uid + '/admin')
    .once('value')
    .then((snapshot) => snapshot.val() === true);
  if (admin) {
    await db
      .ref('type2MaleEnrolledMatchList')
      .once('value')
      .then((snapshot) => {
        for (let key in snapshot.val()) {
          maleEnrolledMatchList.push(snapshot.val()[key]);
        }
      });
    await db
      .ref('type2FemaleEnrolledMatchList')
      .once('value')
      .then((snapshot) => {
        for (let key in snapshot.val()) {
          femaleEnrolledMatchList.push(snapshot.val()[key]);
        }
      });
    await db
      .ref('type3MaleEnrolledMatchList')
      .once('value')
      .then((snapshot) => {
        for (let key in snapshot.val()) {
          maleEnrolledMatchList.push(snapshot.val()[key]);
        }
      });
    await db
      .ref('type3FemaleEnrolledMatchList')
      .once('value')
      .then((snapshot) => {
        for (let key in snapshot.val()) {
          femaleEnrolledMatchList.push(snapshot.val()[key]);
        }
      });
    await db
      .ref('type4MaleEnrolledMatchList')
      .once('value')
      .then((snapshot) => {
        for (let key in snapshot.val()) {
          maleEnrolledMatchList.push(snapshot.val()[key]);
        }
      });
    await db
      .ref('type4FemaleEnrolledMatchList')
      .once('value')
      .then((snapshot) => {
        for (let key in snapshot.val()) {
          femaleEnrolledMatchList.push(snapshot.val()[key]);
        }
      });
    const enrolledMatchList = [maleEnrolledMatchList, femaleEnrolledMatchList];
    return enrolledMatchList;
  }
};

export const matchEnrolledMatchListDb = async (enrolledMatchList) => {
  const admin = await db
    .ref('users/' + auth.currentUser.uid + '/admin')
    .once('value')
    .then((snapshot) => snapshot.val() === true);
  if (admin) {
    const enrolledMaleList = enrolledMatchList[0];
    const enrolledFemaleList = enrolledMatchList[1];
    const type2MaleList2 = [],
      type3MaleList3 = [],
      type4MaleList4 = [],
      type2FemaleList2 = [],
      type3FemaleList3 = [],
      type4FemaleList4 = [];
    const type2MatchList = [],
      type3MatchList = [],
      type4MatchList = [];

    enrolledMaleList.forEach((data) => {
      switch (data.matchType) {
        case 2:
          type2MaleList2.push(data);
          break;
        case 3:
          type3MaleList3.push(data);
          break;
        case 4:
          type4MaleList4.push(data);
          break;
        default:
          break;
      }
    });
    enrolledFemaleList.forEach((data) => {
      switch (data.matchType) {
        case 2:
          type2FemaleList2.push(data);
          break;
        case 3:
          type3FemaleList3.push(data);
          break;
        case 4:
          type4FemaleList4.push(data);
          break;
        default:
          break;
      }
    });
    type2MaleList2.forEach((data, dataIndex) => {
      type2FemaleList2.every((target, targetIndex) => {
        const usersMatch = target.users.every((targetUser) => {
          const ageMatch =
            targetUser.age >= data.matchAgeRange[0] &&
            targetUser.age <= data.matchAgeRange[1];
          const univMatch = data.matchUniversities.includes(
            targetUser.university
          );
          return ageMatch && univMatch;
        });
        const matchingDates = data.availableDates.filter((date) =>
          target.availableDates.includes(date)
        );
        if (usersMatch && matchingDates.length > 0) {
          type2MatchList.push({
            dates: matchingDates,
            users: data.users.concat(target.users),
            matchType: 2,
          });
          type2FemaleList2.splice(targetIndex, 1);
          type2MaleList2.splice(dataIndex, 1);
          return false;
        }
        return true;
      });
    });
    type3MaleList3.forEach((data, dataIndex) => {
      type3FemaleList3.every((target, targetIndex) => {
        const usersMatch = target.users.every((targetUser) => {
          const ageMatch =
            targetUser.age >= data.matchAgeRange[0] &&
            targetUser.age <= data.matchAgeRange[1];
          const univMatch = data.matchUniversities.includes(
            targetUser.university
          );
          return ageMatch && univMatch;
        });
        const matchingDates = data.availableDates.filter((date) =>
          target.availableDates.includes(date)
        );
        if (usersMatch && matchingDates.length > 0) {
          type3MatchList.push({
            dates: matchingDates,
            users: data.users.concat(target.users),
            matchType: 3,
          });
          type3FemaleList3.splice(targetIndex, 1);
          type3MaleList3.splice(dataIndex, 1);
          return false;
        }
        return true;
      });
    });
    type4MaleList4.forEach((data, dataIndex) => {
      type4FemaleList4.every((target, targetIndex) => {
        const usersMatch = target.users.every((targetUser) => {
          const ageMatch =
            targetUser.age >= data.matchAgeRange[0] &&
            targetUser.age <= data.matchAgeRange[1];
          const univMatch = data.matchUniversities.includes(
            targetUser.university
          );
          return ageMatch && univMatch;
        });
        const matchingDates = data.availableDates.filter((date) =>
          target.availableDates.includes(date)
        );
        if (usersMatch && matchingDates.length > 0) {
          type4MatchList.push({
            dates: matchingDates,
            users: data.users.concat(target.users),
            matchType: 4,
          });
          type4FemaleList4.splice(targetIndex, 1);
          type4MaleList4.splice(dataIndex, 1);
          return false;
        }
        return true;
      });
    });

    const type2CurrentMatchListUpdates = {};
    const type3CurrentMatchListUpdates = {};
    const type4CurrentMatchListUpdates = {};
    const usersCurrentMatchListUpdates = {};
    type2MatchList.forEach((data) => {
      const newMatchKey = db.ref('type2CurrentMatchList').push().key;
      type2CurrentMatchListUpdates[newMatchKey] = data;
      data.users.forEach((user) => {
        usersCurrentMatchListUpdates[user.uid + '/' + newMatchKey] = data;
      });
    });
    type3MatchList.forEach((data) => {
      const newMatchKey = db.ref('type3CurrentMatchList').push().key;
      type3CurrentMatchListUpdates[newMatchKey] = data;
      data.users.forEach((user) => {
        usersCurrentMatchListUpdates[user.uid + '/' + newMatchKey] = data;
      });
    });
    type4MatchList.forEach((data) => {
      const newMatchKey = db.ref('type4CurrentMatchList').push().key;
      type4CurrentMatchListUpdates[newMatchKey] = data;
      data.users.forEach((user) => {
        usersCurrentMatchListUpdates[user.uid + '/' + newMatchKey] = data;
      });
    });

    const prevUsersEnrolledMatchList = await db
      .ref('usersEnrolledMatchList')
      .once('value')
      .then((snapshot) => snapshot.val());
    const newUsersEnrolledMatchList = {};
    for (let usersKey in prevUsersEnrolledMatchList) {
      const usersMatchList = prevUsersEnrolledMatchList[usersKey];
      for (let [matchKey, matchVal] in usersMatchList) {
        switch (matchVal.matchType) {
          case 2:
            if (type2MaleList2.contains(matchVal)) {
              newUsersEnrolledMatchList[usersKey][matchKey] = matchVal;
            }
            break;
          case 3:
            if (type3MaleList3.contains(matchVal)) {
              newUsersEnrolledMatchList[usersKey][matchKey] = matchVal;
            }
            break;
          case 4:
            if (type4MaleList4.contains(matchVal)) {
              newUsersEnrolledMatchList[usersKey][matchKey] = matchVal;
            }
            break;
          default:
            break;
        }
      }
    }

    db.ref('type2CurrentMatchList').update(type2CurrentMatchListUpdates);
    db.ref('type3CurrentMatchList').update(type3CurrentMatchListUpdates);
    db.ref('type4CurrentMatchList').update(type4CurrentMatchListUpdates);
    db.ref('usersCurrentMatchList').update(usersCurrentMatchListUpdates);
    db.ref('type2MaleEnrolledMatchList').set(type2MaleList2);
    db.ref('type2FemaleEnrolledMatchList').set(type2FemaleList2);
    db.ref('type3MaleEnrolledMatchList').set(type3MaleList3);
    db.ref('type3FemaleEnrolledMatchList').set(type3FemaleList3);
    db.ref('type4MaleEnrolledMatchList').set(type4MaleList4);
    db.ref('type4FemaleEnrolledMatchList').set(type4FemaleList4);
    db.ref('usersEnrolledMatchList').set(newUsersEnrolledMatchList);
  }
};

export const getCurrentMatchListFromDb = async () => {
  const type2CurrentMatchList = [], type3CurrentMatchList = [], type4CurrentMatchList = [];
  const admin = await db
    .ref('users/' + auth.currentUser.uid + '/admin')
    .once('value')
    .then((snapshot) => snapshot.val() === true);
  if (admin) {
    await db.ref('type2CurrentMatchList').once('value').then(snapshot => {
      for (let key in snapshot.val()) {
        type2CurrentMatchList.push(snapshot.val()[key]);
      }
    })
    await db.ref('type3CurrentMatchList').once('value').then(snapshot => {
      for (let key in snapshot.val()) {
        type3CurrentMatchList.push(snapshot.val()[key]);
      }
    })
    await db.ref('type4CurrentMatchList').once('value').then(snapshot => {
      for (let key in snapshot.val()) {
        type4CurrentMatchList.push(snapshot.val()[key]);
      }
    })
    const currentMatchList = [type2CurrentMatchList, type3CurrentMatchList, type4CurrentMatchList];
    return currentMatchList;
  }
}