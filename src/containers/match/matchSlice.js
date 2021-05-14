export const jumpToPage = (matchPage) => {
  return {
    type: 'matchPage/jumpToPage',
    payload: matchPage,
  };
};

const initialMatchPage = 1;

export const matchPageReducer = (matchPage = initialMatchPage, action) => {
  switch (action.type) {
    case 'matchPage/jumpToPage':
      return action.payload;
    default:
      return matchPage;
  }
};

export const friendUsernameAvailable = (usernameAvailable) => {
  //todo(sounho): check if friend username is available in db
  return {
    type: 'matchPageFriendUsername/friendUsernameAvailable',
    payload: usernameAvailable,
  };
};

export const checkFriendUsernameRegex = (username) => {
  const validUsernameRegex = username.length <= 10;

  return {
    type: 'matchPageFriendUsername/checkFriendUsernameRegex',
    payload: validUsernameRegex,
  }
}

const initialState = {
  lengthError: false,
  inavailableError: false,
  helperText: '',
};

export const matchPageFriendUsernameReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'matchPageFriendUsername/friendUsernameAvailable':
      return {
        ...state,
        inavailableError: !action.payload,
        helperText: !action.payload ? '존재하지 않는 닉네임입니다' : '',
      };
    case 'matchPageFriendUsername/checkFriendUsernameRegex':
      return {
        ...state,
        lengthError: !action.payload,
        helperText: !action.payload ? '닉네임이 너무 길어요' : '',
      }
    default:
      return state;
  }
};

export const selectUniversity = (university) => {
  return {
    type: 'inputMatchConditions/selectUniversity',
    payload: university,
  };
};

export const updateAgeRange = (ageRange) => {
  return {
    type: 'inputMatchConditions/updateAgeRange',
    payload: ageRange,
  };
};

export const enableNavigationButton = () => {
  return { type: 'inputMatchConditions/enableNavigationButton' };
};

const initialMatchConditions = {
  selectedUniversity: ['서울대', '연세대', '고려대'],
  unselectedUniversity: [],
  enableNavigationButton: false,
  ageRange: [20, 29],
};

export const inputMatchConditionsReducer = (
  matchConditions = initialMatchConditions,
  action
) => {
  switch (action.type) {
    case 'inputMatchConditions/selectUniversity':
      if (matchConditions.selectedUniversity.some((e) => e === action.payload))
        return {
          ...matchConditions,
          selectedUniversity: matchConditions.selectedUniversity.filter(
            (e) => e !== action.payload
          ),
          unselectedUniversity: [
            ...matchConditions.unselectedUniversity,
            action.payload,
          ],
        };
      else
        return {
          ...matchConditions,
          selectedUniversity: [
            ...matchConditions.selectedUniversity,
            action.payload,
          ],
          unselectedUniversity: matchConditions.unselectedUniversity.filter(
            (e) => e !== action.payload
          ),
        };
    case 'inputMatchConditions/updateAgeRange':
      return {
        ...matchConditions,
        ageRange: action.payload,
      };
    case 'inputMatchConditions/enableNavigationButton':
      return {
        ...matchConditions,
        enableNavigationButton: true,
      }
    default:
      return matchConditions;
  }
};

export const updateNumPersons = (numPersons) => {
  return {
    type: 'matchInfo/updateNumPersons',
    payload: numPersons,
  };
};

export const updateFriendUsername = (friendUsername) => {
  return {
    type: 'matchInfo/updateFriendUsername',
    payload: friendUsername,
  };
};

export const updateMatchUniversity = (matchUniversity) => {
  return {
    type: 'matchInfo/updateMatchUniversity',
    payload: matchUniversity,
  };
};

export const updateMatchInfoAgeRange = (ageRange) => {
  return {
    type: 'matchInfo/updateMatchInfoAgeRange',
    payload: ageRange,
  };
};

const initialMatchInfo = {
  numPersons: 0,
  friendUsername: '',
  matchUniversity: [],
  ageRange: [],
};

export const matchInfoReducer = (matchInfo = initialMatchInfo, action) => {
  switch (action.type) {
    case 'matchInfo/updateNumPersons':
      return { ...matchInfo, numPersons: action.payload };
    case 'matchInfo/updateFriendUsername':
      return { ...matchInfo, friendUsername: action.payload };
    case 'matchInfo/updateMatchUniversity':
      return { ...matchInfo, matchUniversity: action.payload };
    case 'matchInfo/updateMatchInfoAgeRange':
      return { ...matchInfo, ageRange: action.payload };
    default:
      return matchInfo;
  }
};
