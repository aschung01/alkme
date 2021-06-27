export const jumpToPage = (matchPage) => {
  return {
    type: 'matchPage/jumpToPage',
    payload: matchPage,
  };
};

export const isMatchEnrollAvailable = (available) => {
  return {
    type: 'matchPage/isMatchEnrollAvailable',
    payload: available,
  };
};

export const triggerMatchEnrollWarningAlert = () => {
  return {
    type: 'matchPage/triggerMatchEnrollWarningAlert',
  };
};

const initialMatchPage = {
  page: 1,
  enrollAvailable: true,
  warningAlert: false,
};

export const matchPageReducer = (state = initialMatchPage, action) => {
  switch (action.type) {
    case 'matchPage/jumpToPage':
      return {
        ...state,
        page: action.payload,
      };
    case 'matchPage/isMatchEnrollAvailable':
      return {
        ...state,
        enrollAvailable: action.payload,
      };
    case 'matchPage/triggerMatchEnrollWarningAlert':
      return {
        ...state,
        warningAlert: !state.warningAlert,
      };
    default:
      return state;
  }
};

export const friendUsernameAvailable = (usernameAvailable) => {
  //todo(sounho): check if friend username is available in db
  return {
    type: 'matchPageFriendUsername/friendUsernameAvailable',
    payload: usernameAvailable,
  };
};

export const newFriendUsername = (isNew) => {
  return {
    type: 'matchPageFriendUsername/newFriendUsername',
    payload: isNew,
  };
};

export const doesFriendGenderMatch = (genderMatch) => {
  return {
    type: 'matchPageFriendUsername/doesFriendGenderMatch',
    payload: genderMatch,
  };
};

export const isUserUsername = (isUser) => {
  return {
    type: 'matchPageFriendUsername/isUserUsername',
    payload: isUser,
  };
};

export const isFriendEnrollAvailable = (enrollAvailable) => {
  return {
    type: 'matchPageFriendUsername/isFriendEnrollAvailable',
    payload: enrollAvailable,
  };
};

export const toggleFriendEnrollWarningAlert = () => {
  return {
    type: 'matchPageFriendUsername/toggleFriendEnrollWarningAlert',
  }
}

export const resolveFriendUsernameErrors = () => {
  return {
    type: 'matchPageFriendUsername/resolveFriendUsernameErrors',
  };
};

export const checkFriendUsernameRegex = (username) => {
  const validUsernameRegex = username.length <= 10;

  return {
    type: 'matchPageFriendUsername/checkFriendUsernameRegex',
    payload: validUsernameRegex,
  };
};

export const updateMatchPageFriendUsername = (username) => {
  return {
    type: 'matchPageFriendUsername/updateMatchPageFriendUsername',
    payload: username,
  };
};

const initialState = {
  lengthError: false,
  inavailableError: false,
  notNewError: false,
  genderError: false,
  isUserError: false,
  friendEnrollError: false,
  warningAlert: false,
  helperText: '',
  friendUsername: '',
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
    case 'matchPageFriendUsername/newFriendUsername':
      return {
        ...state,
        notNewError: !action.payload,
        helperText: !action.payload ? '이미 추가한 친구 닉네임입니다' : '',
      };
    case 'matchPageFriendUsername/doesFriendGenderMatch':
      return {
        ...state,
        genderError: !action.payload,
        helperText: !action.payload
          ? '본인과 같은 성별의 친구만 추가할 수 있어요'
          : '',
      };
    case 'matchPageFriendUsername/isUserUsername':
      return {
        ...state,
        isUserError: action.payload,
        helperText: action.payload ? '본인 닉네임을 추가할 수 없습니다' : '',
      };
    case 'matchPageFriendUsername/isFriendEnrollAvailable':
      return {
        ...state,
        friendEnrollError: !action.payload,
      };
    case 'matchPageFriendUsername/toggleFriendEnrollWarningAlert':
      return {
        ...state,
        warningAlert: !state.warningAlert,
      }
    case 'matchPageFriendUsername/resolveFriendUsernameErrors':
      return {
        ...state,
        inavailableError: false,
        notNewError: false,
        genderError: false,
        isUserError: false,
      };
    case 'matchPageFriendUsername/checkFriendUsernameRegex':
      return {
        ...state,
        lengthError: !action.payload,
        helperText: !action.payload ? '닉네임이 너무 길어요' : '',
      };
    case 'matchPageFriendUsername/updateMatchPageFriendUsername':
      return {
        ...state,
        friendUsername: action.payload,
      };
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

export const toggleSelectAllUniversities = () => {
  return {
    type: 'inputMatchConditions/toggleSelectAllUniversities',
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
    case 'inputMatchConditions/toggleSelectAllUniversities':
      if (matchConditions.unselectedUniversity.length === 0)
        return {
          ...matchConditions,
          selectedUniversity: [],
          unselectedUniversity: initialMatchConditions.selectedUniversity,
        };
      else
        return {
          ...matchConditions,
          selectedUniversity: initialMatchConditions.selectedUniversity,
          unselectedUniversity: [],
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
      };
    default:
      return matchConditions;
  }
};

export const updateInputMatchType = (matchType) => {
  return {
    type: 'inputMatchInfo/updateInputMatchType',
    payload: matchType,
  };
};

export const updateInputNumPersons = (numPersons) => {
  return {
    type: 'inputMatchInfo/updateInputNumPersons',
    payload: numPersons,
  };
};

export const updateInputFriendUsernameData = (friendUsername) => {
  return {
    type: 'inputMatchInfo/updateInputFriendUsernameData',
    payload: friendUsername,
  };
};

export const deleteInputFriendUsernameData = (key) => {
  return {
    type: 'inputMatchInfo/deleteInputFriendUsernameData',
    payload: key,
  };
};

export const updateInputMatchUniversities = (matchUniversities) => {
  return {
    type: 'inputMatchInfo/updateInputMatchUniversities',
    payload: matchUniversities,
  };
};

export const updateInputMatchInfoAgeRange = (ageRange) => {
  return {
    type: 'inputMatchInfo/updateInputMatchInfoAgeRange',
    payload: ageRange,
  };
};

export const updateInputAvailableDates = (dates) => {
  return {
    type: 'inputMatchInfo/updateInputAvailableDates',
    payload: dates,
  };
};

export const resetInputMatchInfo = () => {
  return {
    type: 'inputMatchInfo/resetInputMatchInfo',
  };
};

const initialInputMatchInfo = {
  matchType: 0,
  numPersons: 0,
  availableDates: [],
  friendUsernameData: [],
  matchUniversities: [],
  ageRange: [],
};

export const inputMatchInfoReducer = (
  inputMatchInfo = initialInputMatchInfo,
  action
) => {
  switch (action.type) {
    case 'inputMatchInfo/updateInputMatchType':
      return { ...inputMatchInfo, matchType: action.payload };
    case 'inputMatchInfo/updateInputNumPersons':
      return { ...inputMatchInfo, numPersons: action.payload };
    case 'inputMatchInfo/updateInputFriendUsernameData':
      return {
        ...inputMatchInfo,
        friendUsernameData: [
          ...inputMatchInfo.friendUsernameData,
          {
            key: inputMatchInfo.friendUsernameData.length,
            label: action.payload,
          },
        ],
      };
    case 'inputMatchInfo/deleteInputFriendUsernameData':
      return {
        ...inputMatchInfo,
        friendUsernameData: inputMatchInfo.friendUsernameData.filter(
          (e) => e.key !== action.payload
        ),
      };
    case 'inputMatchInfo/updateInputMatchUniversities':
      return { ...inputMatchInfo, matchUniversities: action.payload };
    case 'inputMatchInfo/updateInputMatchInfoAgeRange':
      return { ...inputMatchInfo, ageRange: action.payload };
    case 'inputMatchInfo/updateInputAvailableDates':
      return { ...inputMatchInfo, availableDates: action.payload };
    case 'inputMatchInfo/resetInputMatchInfo':
      return initialInputMatchInfo;
    default:
      return inputMatchInfo;
  }
};
