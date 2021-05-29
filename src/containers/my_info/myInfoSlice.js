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
  }
}

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
  }
}

export const checkSettingsUsernameRegex = (username) => {
  const validRegex = username.length <= 10;
  return {
    type: 'myInfoSettings/checkSettingsUsernameRegex',
    payload: validRegex,
  }
}

export const isSettingsUsernameAvailable = (available) => {
  return {
    type: 'myInfoSettings/isSettingsUsernameAvailable',
    payload: available,
  }
}

export const isSettingsUsernameNew = (isNew) => {
  return {
    type: 'myInfoSettings/isSettingsUsernameNew',
    payload: isNew,
  }
}

const isEmailValid = (emailId) => {
  const regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-])+$/;
  return regex.test(emailId);
};

const initialSettings = {
  personalInfo: {
    email: '',
    password: '',
    username: '',
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
  passwordRegexError: false,
  passwordHelperText: '',
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
    case 'myInfoSettings/updateSettingsEmailId':
      return {
        ...settings,
        settingsEmailId: action.payload,
      };
    case 'myInfoSettings/updateSettingsEmailAddress':
      return {
        ...settings,
        settingsEmailAddress: action.payload,
      }
    case 'myInfoSettings/checkSettingsEmailRegex':
      return {
        ...settings,
        emailRegexError: !action.payload,
        emailHelperText: !action.payload ? '이메일 형식이 올바르지 않습니다' : '',
      };
    case 'myInfoSettings/isSettingsEmailAvailable':
      return {
        ...settings,
        emailInavailableError: !action.payload,
        emailHelperText: !action.payload ? '이미 존재하는 이메일입니다' : '',
      }
    case 'myInfoSettings/isSettingsEmailNew':
      return {
        ...settings,
        emailNotNewError: !action.payload,
        emailHelperText: !action.payload ? '현재 이메일과 동일합니다' : '',
      }
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
      }
    case 'myInfoSettings/isSettingsUsernameNew':
      return {
        ...settings,
        usernameNotNewError: !action.payload,
        usernameHelperText: !action.payload ? '현재 닉네임과 동일합니다' : '',
      }
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
  showPreviousMatch: false,
  showCurrentMatch: false,
  showWaitingMatch: false,
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
    default:
      return state;
  }
};
