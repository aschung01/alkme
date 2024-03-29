export const updateSettingsEmail = (email) => {
  return {
    type: 'myInfoSettings/updateSettingsEmail',
    payload: email,
  };
};

export const updateSettingsPassword = (password) => {
  return {
    type: 'myInfoSettings/updateSettingsPassword',
    payload: password,
  };
};

export const updateSettingsUsername = (username) => {
  return {
    type: 'myInfoSettings/updateSettingsUsername',
    payload: username,
  };
};

export const updateSettingsGender = (gender) => {
  return {
    type: 'myInfoSettings/updateSettingsGender',
    payload: gender,
  };
};

export const updateSettingsUniversity = (university) => {
  return {
    type: 'myInfoSettings/updateSettingsUniversity',
    payload: university,
  };
};

export const updateSettingsAge = (age) => {
  return {
    type: 'myInfoSettings/updateSettingsAge',
    payload: age,
  };
};

export const cancelSettingsEmailUpdate = () => {
  return {
    type: 'myInfoSettings/cancelEmailUpdate',
  };
};

export const cancelSettingsUsernameUpdate = () => {
  return {
    type: 'myInfoSettings/cancelUsernameUpdate',
  };
};

export const cancelSettingsGenderUpdate = () => {
  return {
    type: 'myInfoSettings/cancelGenderUpdate',
  };
};

export const cancelSettingsUniversityUpdate = () => {
  return {
    type: 'myInfoSettings/cancelUniversityUpdate',
  };
};

export const cancelSettingsAgeUpdate = () => {
  return {
    type: 'myInfoSettings/cancelAgeUpdate',
  };
};

export const updateSettingsEmailId = (emailId) => {
  return {
    type: 'myInfoSettings/updateSettingsEmailId',
    payload: emailId,
  };
};

export const updateSettingsEmailAddress = (emailAddress) => {
  return {
    type: 'myInfoSettings/updateSettingsEmailAddress',
    payload: emailAddress,
  };
};

export const checkSettingsEmailRegex = (email) => {
  const validRegex = isEmailValid(email);
  return {
    type: 'myInfoSettings/checkSettingsEmailRegex',
    payload: validRegex,
  };
};

export const isSettingsEmailAvailable = (emailAvailable) => {
  return {
    type: 'myInfoSettings/isSettingsEmailAvailable',
    payload: emailAvailable,
  };
};

export const isSettingsEmailNew = (newEmail) => {
  return {
    type: 'myInfoSettings/isSettingsEmailNew',
    payload: newEmail,
  };
};

export const checkSettingsUsernameRegex = (username) => {
  const validRegex = username.length <= 10;
  return {
    type: 'myInfoSettings/checkSettingsUsernameRegex',
    payload: validRegex,
  };
};

export const isSettingsUsernameAvailable = (available) => {
  return {
    type: 'myInfoSettings/isSettingsUsernameAvailable',
    payload: available,
  };
};

export const isSettingsUsernameNew = (isNew) => {
  return {
    type: 'myInfoSettings/isSettingsUsernameNew',
    payload: isNew,
  };
};

export const cancelSettingsPasswordUpdate = () => {
  return {
    type: 'myInfoSettings/cancelSettingsPasswordUpdate',
  };
};

export const checkSettingsPasswordRegex1 = (password) => {
  const passwordValid = isPasswordValid(password);
  return {
    type: 'myInfoSettings/checkSettingsPasswordRegex1',
    payload: passwordValid,
  };
};

export const checkSettingsPasswordRegexAndMatch = () => {
  return {
    type: 'myInfoSettings/checkSettingsPasswordRegexAndMatch',
  };
};

export const checkSettingsPasswordMatch = () => {
  return {
    type: 'myInfoSettings/checkSettingsPasswordMatch',
  };
};

export const updateSettingsInputPassword = (password) => {
  return {
    type: 'myInfoSettings/updateSettingsInputPassword',
    payload: password,
  };
};

export const updateSettingsCheckPassword = (password) => {
  return {
    type: 'myInfoSettings/updateSettingsCheckPassword',
    payload: password,
  };
};

export const isSettingsPasswordNew = (isNew) => {
  return {
    type: 'myInfoSettings/isSettingsPasswordNew',
    payload: isNew,
  };
};

const isPasswordValid = (password) => {
  // Password requirements are as follows:
  // 8 ~ 64 characters
  // Min 1 uppercase
  // Min 1 lowercase
  // Min 1 numeric number
  return password.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_=+]{8,64}$/
  );
};

const isEmailValid = (emailId) => {
  const regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-])+$/;
  return regex.test(emailId);
};

const initialSettings = {
  personalInfo: {
    email: '',
    password: '',
    username: '',
    gender: '',
    university: '',
    age: 0,
  },
  settingsEmailId: '',
  settingsEmailAddress: '',
  emailRegexError: false,
  emailInavailableError: false,
  emailNotNewError: false,
  emailHelperText: '',
  settingsUsername: '',
  usernameRegexError: false,
  usernameInavailableError: false,
  usernameHelperText: '',
  inputPassword: '',
  checkPassword: '',
  passwordError1: false,
  passwordError2: false,
  passwordHelperText1: '',
  passwordHelperText2: '',
};

export const myInfoSettingsReducer = (settings = initialSettings, action) => {
  switch (action.type) {
    case 'myInfoSettings/updateSettingsEmail':
      return {
        ...settings,
        personalInfo: {
          ...settings.personalInfo,
          email: action.payload,
        },
      };
    case 'myInfoSettings/updateSettingsPassword':
      return {
        ...settings,
        personalInfo: {
          ...settings.personalInfo,
          password: action.payload,
        },
      };
    case 'myInfoSettings/updateSettingsUsername':
      return {
        ...settings,
        personalInfo: {
          ...settings.personalInfo,
          username: action.payload,
        },
      };
    case 'myInfoSettings/updateSettingsGender':
      return {
        ...settings,
        personalInfo: {
          ...settings.personalInfo,
          gender: action.payload,
        },
      };
    case 'myInfoSettings/updateSettingsUniversity':
      return {
        ...settings,
        personalInfo: {
          ...settings.personalInfo,
          university: action.payload,
        },
      };
    case 'myInfoSettings/updateSettingsAge':
      return {
        ...settings,
        personalInfo: {
          ...settings.personalInfo,
          age: action.payload,
        },
      };
    case 'myInfoSettings/cancelSettingsEmailUpdate':
      return {
        ...settings,
        settingsEamilId: '',
        settingsEmailAddress: '',
        emailRegexError: false,
        emailInavailableError: false,
        emailNotNewError: false,
        emailHelperText: '',
        personalInfo: {
          ...settings.personalInfo,
          email: '',
        },
      };
    case 'myInfoSettings/cancelSettingsUsernameUpdate':
      return {
        ...settings,
        settingsUsername: '',
        usernameRegexError: false,
        usernameInavailableError: false,
        usernameHelperText: '',
        personalInfo: {
          ...settings.personalInfo,
          username: '',
        },
      };
    case 'myInfoSettings/cancelSettingsGenderUpdate':
      return {
        ...settings,
        personalInfo: {
          ...settings.personalInfo,
          gender: '',
        },
      };
    case 'myInfoSettings/cancelUniversityUpdate':
      return {
        ...settings,
        personalInfo: {
          ...settings.personalInfo,
          university: '',
        },
      };
    case 'myInfoSettings/cancelSettingsAgeUpdate':
      return {
        ...settings,
        personalInfo: {
          ...settings.personalInfo,
          age: 0,
        },
      };
    case 'myInfoSettings/updateSettingsEmailId':
      return {
        ...settings,
        settingsEmailId: action.payload,
      };
    case 'myInfoSettings/updateSettingsEmailAddress':
      return {
        ...settings,
        settingsEmailAddress: action.payload,
      };
    case 'myInfoSettings/checkSettingsEmailRegex':
      return {
        ...settings,
        emailRegexError: !action.payload,
        emailHelperText: !action.payload
          ? '이메일 형식이 올바르지 않습니다'
          : '',
      };
    case 'myInfoSettings/isSettingsEmailAvailable':
      return {
        ...settings,
        emailInavailableError: !action.payload,
        emailHelperText: !action.payload ? '이미 존재하는 이메일입니다' : '',
      };
    case 'myInfoSettings/isSettingsEmailNew':
      return {
        ...settings,
        emailNotNewError: !action.payload,
        emailHelperText: !action.payload ? '현재 이메일과 동일합니다' : '',
      };
    case 'myInfoSettings/checkSettingsUsernameRegex':
      return {
        ...settings,
        usernameRegexError: !action.payload,
        usernameHelperText: !action.payload ? '닉네임이 너무 길어요' : '',
      };
    case 'myInfoSettings/isSettingsUsernameAvailable':
      return {
        ...settings,
        usernameInavailableError: !action.payload,
        usernameHelperText: !action.payload ? '이미 존재하는 닉네임입니다' : '',
      };
    case 'myInfoSettings/isSettingsUsernameNew':
      return {
        ...settings,
        usernameNotNewError: !action.payload,
        usernameHelperText: !action.payload ? '현재 닉네임과 동일합니다' : '',
      };
    case 'myInfoSettings/cancelSettingsPasswordUpdate':
      return {
        ...settings,
        inputPassword: '',
        checkPassword: '',
        passwordError1: false,
        passwordError2: false,
        passwordHelperText1: '',
        passwordHelperText2: '',
      };
    case 'myInfoSettings/checkSettingsPasswordRegex1':
      return {
        ...settings,
        passwordError1: !action.payload,
        passwordHelperText1: !action.payload
          ? '비밀번호 형식이 올바르지 않습니다'
          : '',
      };
    case 'myInfoSettings/checkSettingsPasswordRegexAndMatch':
      if (
        isPasswordValid(settings.checkPassword) &&
        settings.inputPassword === settings.checkPassword
      )
        return {
          ...settings,
          passwordError2: false,
          passwordHelperText2: '',
        };
      else if (settings.inputPassword !== settings.checkPassword)
        return {
          ...settings,
          passwordError2: true,
          passwordHelperText2: '비밀번호가 일치하지 않아요',
        };
      else if (!isPasswordValid(settings.checkPassword))
        return {
          ...settings,
          passwordError2: true,
          passwordHelperText2: '비밀번호 형식이 올바르지 않아요',
        };
      break;
    case 'myInputSettings/checkSettingsPasswordMatch':
      if (settings.inputPassword !== settings.checkPassword)
        return {
          ...settings,
          passwordError2: true,
          passwordHelperText2: '비밀번호가 일치하지 않아요',
        };
      else
        return {
          ...settings,
          passwordError2: false,
          passwordHelperText2: '',
        };
    case 'myInfoSettings/updateSettingsInputPassword':
      return {
        ...settings,
        inputPassword: action.payload,
      };
    case 'myInfoSettings/updateSettingsCheckPassword':
      return {
        ...settings,
        checkPassword: action.payload,
      };
    case 'myInfoSettings/isSettingsPasswordNew':
      return {
        ...settings,
        passwordError1: !action.payload,
        passwordHelperText1: !action.payload
          ? '현재 비밀번호와 동일합니다'
          : '',
      };
    default:
      return settings;
  }
};

export const jumpPersonalInfoPage = (int) => {
  return {
    type: 'myInfoPageState/jumpPersonalInfoPage',
    payload: int,
  };
};

export const toggleMatchHistoryPage = (match) => {
  return {
    type: 'myInfoPageState/toggleMatchHistoryPage',
    payload: match,
  };
};

export const toggleShowPreviousMatch = () => {
  return {
    type: 'myInfoPageState/toggleShowPreviousMatch',
  };
};

export const toggleShowCurrentMatch = () => {
  return {
    type: 'myInfoPageState/toggleShowCurrentMatch',
  };
};

export const toggleShowWaitingMatch = () => {
  return {
    type: 'myInfoPageState/toggleShowWaitingMatch',
  };
};

export const updateInputPassword = (password) => {
  return {
    type: 'myInfoPageState/updateInputPassword',
    payload: password,
  };
};

export const checkPasswordRegex = (password) => {
  const validRegex = isPasswordRegexValid(password);
  return {
    type: 'myInfoPageState/checkPasswordRegex',
    payload: validRegex,
  };
};

export const isUserReauthenticated = (valid) => {
  return {
    type: 'myInfoPageState/isUserReauthenticated',
    payload: valid,
  };
};

export const updateInputEmail = (email) => {
  return {
    type: 'myInfoPageState/updateInputEmail',
    payload: email,
  };
};

export const cancelReauthentication = () => {
  return {
    type: 'myInfoPageState/cancelReauthentication',
  };
};

export const resetMyInfoPageState = () => {
  return {
    type: 'myInfoPageState/resetMyInfoPageState',
  }
}

const isPasswordRegexValid = (password) => {
  // Password requirements are as follows:
  // 8 ~ 64 characters
  // Min 1 uppercase
  // Min 1 lowercase
  // Min 1 numeric number
  return password.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_=+]{8,64}$/
  );
};

const initialPageState = {
  personalInfoPage: 1,
  matchHistoryPage: {
    previousMatch: false,
    presentMatch: false,
    waitingMatch: false,
  },
  inputPassword: '',
  passwordRegexError: false,
  passwordMatchError: false,
  passwordHelperText: '',
};

export const myInfoPageReducer = (state = initialPageState, action) => {
  switch (action.type) {
    case 'myInfoPageState/jumpPersonalInfoPage':
      return {
        ...state,
        personalInfoPage: action.payload,
      };
    case 'myInfoPageState/toggleMatchHistoryPage':
      switch (action.payload) {
        case 'previousMatch':
          return {
            ...state,
            matchHistoryPage: {
              ...state.matchHistoryPage,
              previousMatch: !state.matchHistoryPage.previousMatch,
            },
          };
        case 'presentMatch':
          return {
            ...state,
            matchHistoryPage: {
              ...state.matchHistoryPage,
              presentMatch: !state.matchHistoryPage.presentMatch,
            },
          };
        case 'waitingMatch':
          return {
            ...state,
            matchHistoryPage: {
              ...state.matchHistoryPage,
              waitingMatch: !state.matchHistoryPage.waitingMatch,
            },
          };
        default:
          return state;
      }
    case 'myInfoPageState/toggleShowPreviousMatch':
      return {
        ...state,
        changeEmail: !state.showPreviousMatch,
      };
    case 'myInfoPageState/toggleShowCurrentMatch':
      return {
        ...state,
        changeEmail: !state.showCurrentMatch,
      };
    case 'myInfoPageState/toggleShowWaitingMatch':
      return {
        ...state,
        changeEmail: !state.showWaitingMatch,
      };
    case 'myInfoPageState/updateInputPassword':
      return {
        ...state,
        inputPassword: action.payload,
      };
    case 'myInfoPageState/checkPasswordRegex':
      return {
        ...state,
        passwordRegexError: !action.payload,
        passwordHelperText: !action.payload
          ? '비밀번호 형식이 올바르지 않습니다'
          : '',
      };
    case 'myInfoPageState/isUserReauthenticated':
      return {
        ...state,
        passwordMatchError: !action.payload,
        passwordHelperText: !action.payload
          ? '비밀번호가 올바르지 않습니다'
          : '',
      };
    case 'myInfoPageState/cancelReauthentication':
      return {
        ...state,
        inputPassword: '',
        passwordMatchError: false,
        passwordRegexError: false,
        passwordHelperText: '',
      };
    case 'myInfoPageState/resetMyInfoPageState':
      return initialPageState;
    default:
      return state;
  }
};
