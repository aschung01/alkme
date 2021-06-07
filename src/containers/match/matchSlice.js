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

export const updateInputNumPersons = (numPersons) => {
  return {
    type: 'inputMatchInfo/updateInputNumPersons',
    payload: numPersons,
  };
};

export const updateInputFriendUsername = (friendUsername) => {
  return {
    type: 'inputMatchInfo/updateInputFriendUsername',
    payload: friendUsername,
  };
};

export const updateInputMatchUniversity = (matchUniversity) => {
  return {
    type: 'inputMatchInfo/updateInputMatchUniversity',
    payload: matchUniversity,
  };
};

export const updateInputMatchInfoAgeRange = (ageRange) => {
  return {
    type: 'inputMatchInfo/updateInputMatchInfoAgeRange',
    payload: ageRange,
  };
};

const initialInputMatchInfo = {
  numPersons: 0,
  friendUsername: '',
  matchUniversity: [],
  ageRange: [],
};

export const inputMatchInfoReducer = (inputMatchInfo = initialInputMatchInfo, action) => {
  switch (action.type) {
    case 'inputMatchInfo/updateInputNumPersons':
      return { ...inputMatchInfo, numPersons: action.payload };
    case 'inputMatchInfo/updateInputFriendUsername':
      return { ...inputMatchInfo, friendUsername: action.payload };
    case 'inputMatchInfo/updateInputMatchUniversity':
      return { ...inputMatchInfo, matchUniversity: action.payload };
    case 'inputMatchInfo/updateInputMatchInfoAgeRange':
      return { ...inputMatchInfo, ageRange: action.payload };
    default:
      return inputMatchInfo;
  }
};
