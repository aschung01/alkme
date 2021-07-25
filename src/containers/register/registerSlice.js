export const jumpToPage = (registerPage) => {
  return {
    type: 'registerPage/jumpToPage',
    payload: registerPage,
  };
};

const initialRegisterPage = 1;

export const registerPageReducer = (
  registerPage = initialRegisterPage,
  action
) => {
  switch (action.type) {
    case 'registerPage/jumpToPage':
      return action.payload;
    default:
      return registerPage;
  }
};

export const checkRegisterEmailRegex = (emailId) => {
  const emailValid = isEmailValid(emailId);
  return {
    type: 'registerPageEmail/checkRegisterEmailRegex',
    payload: emailValid,
  };
};

export const isEmailAvailable = (emailAvailable) => {
  return {
    type: 'registerPageEmail/isEmailAvailable',
    payload: emailAvailable,
  };
};

export const updateUserEmailId = (emailId) => {
  return {
    type: 'registerPageEmail/updateUserEmailId',
    payload: emailId,
  };
};

export const updateUserEmailAddress = (emailAddress) => {
  return {
    type: 'registerPageEmail/updateUserEmailAddress',
    payload: emailAddress,
  };
};

const isEmailValid = (emailId) => {
  const regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-])+$/;
  return regex.test(emailId);
};

const initialEmailState = {
  regexError: false,
  inavailableError: false,
  helperText: '',
  userEmailId: '',
  userEmailAddress: '',
  userEmail: '',
};

export const registerPageEmailReducer = (state = initialEmailState, action) => {
  switch (action.type) {
    case 'registerPageEmail/checkEmailRegex':
      return {
        ...state,
        regexError: !action.payload,
        helperText: !action.payload ? '이메일 형식이 올바르지 않습니다' : '',
      };
    case 'registerPageEmail/isEmailAvailable':
      //todo(sounho): return api check
      return {
        ...state,
        inavailableError: !action.payload,
        helperText: !action.payload ? '이미 존재하는 이메일입니다' : '',
      };
    case 'registerPageEmail/updateUserEmailId':
      return {
        ...state,
        userEmailId: action.payload,
      };
    case 'registerPageEmail/updateUserEmailAddress':
      return {
        ...state,
        userEmailAddress: action.payload,
      };
    default:
      return state;
  }
};

export const checkPasswordRegex1 = (password) => {
  const passwordValid1 = isPasswordValid(password);
  return {
    type: 'registerPagePassword/checkPasswordRegex1',
    payload: passwordValid1,
  };
};

export const checkPasswordRegexAndMatch = (password) => {
  return {
    type: 'registerPagePassword/checkPasswordRegexAndMatch',
    payload: password,
  };
};

export const checkPasswordMatch = () => {
  return {
    type: 'registerPagePassword/checkPasswordMatch',
  };
};

export const updateUserPassword = (password) => {
  return {
    type: 'registerPagePassword/updateUserPassword',
    payload: password,
  };
};

export const updateCheckPassword = (password) => {
  return {
    type: 'registerPagePassword/updateCheckPassword',
    payload: password,
  };
};

const isPasswordValid = (password) => {
  // Password requirements are as follows:
  // 8 ~ 64 characters
  // Min 1 uppercase
  // Min 1 lowercase
  // Min 1 numeric number
  return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_=+]{8,64}$/);
};

const initialPasswordState = {
  error1: false,
  error2: false,
  helperText1: '',
  helperText2: '',
  userPassword: '',
  checkPassword: '',
};

export const registerPagePasswordReducer = (
  state = initialPasswordState,
  action
) => {
  switch (action.type) {
    case 'registerPagePassword/checkPasswordRegex1':
      return {
        ...state,
        error1: !action.payload,
        helperText1: action.payload ? '' : '비밀번호 형식이 올바르지 않아요',
      };
    case 'registerPagePassword/checkPasswordRegexAndMatch':
      if (
        isPasswordValid(action.payload) &&
        state.userPassword === state.checkPassword
      )
        return {
          ...state,
          error2: false,
          helperText2: '',
        };
      else if (state.userPassword !== state.checkPassword)
        return {
          ...state,
          error2: true,
          helperText2: '비밀번호가 일치하지 않아요',
        };
      else if (!isPasswordValid(action.payload))
        return {
          ...state,
          error2: true,
          helperText2: '비밀번호 형식이 올바르지 않아요',
        };
      break;
    case 'registerPagePassword/checkPasswordMatch':
      if (state.userPassword !== state.checkPassword)
        return {
          ...state,
          error2: true,
          helperText2: '비밀번호가 일치하지 않아요',
        };
      else
        return {
          ...state,
          error2: false,
          helperText2: '',
        };
    case 'registerPagePassword/updateUserPassword':
      return {
        ...state,
        userPassword: action.payload,
      };
    case 'registerPagePassword/updateCheckPassword':
      return {
        ...state,
        checkPassword: action.payload,
      };
    default:
      return state;
  }
};

export const updateUsername = (username) => {
  return {
    type: 'registerPageUsername/updateUsername',
    payload: username,
  };
};

export const checkUsernameLength = (username) => {
  const validLength = username.length <= 10;
  return {
    type: 'registerPageUsername/checkUsernameLength',
    payload: validLength,
  }
}

export const isUsernameAvailable = (usernameAvailable) => {
  //todo(sounho): return api checking username availability
  return {
    type: 'registerPageUsername/isUsernameAvailable',
    payload: usernameAvailable,
  };
};

const initialUsernameState = {
  username: '',
  lengthError: false,
  inavailableError: false,
  helperText: '',
};

export const registerPageUsernameReducer = (
  state = initialUsernameState,
  action
) => {
  switch (action.type) {
    case 'registerPageUsername/updateUsername':
      return {
        ...state,
        username: action.payload,
      };
    case 'registerPageUsername/checkUsernameLength':
      return {
        ...state,
        lengthError: !action.payload,
        helperText: !action.payload ? '닉네임이 너무 길어요' : '',
      }
    case 'registerPageUsername/isUsernameAvailable':
      return {
        ...state,
        inavailableError: !action.payload,
        helperText: !action.payload ? '이미 존재하는 닉네임이에요' : '',
      };
    default:
      return state;
  }
};

export const updateUserInfoEmail = (email) => {
  return {
    type: 'registerPageUserInfo/updateUserInfoEmail',
    payload: email,
  };
};

export const updateUserInfoPassword = (password) => {
  return {
    type: 'registerPageUserInfo/updateUserInfoPassword',
    payload: password,
  };
};

export const updateUserInfoUsername = (username) => {
  return {
    type: 'registerPageUserInfo/updateUserInfoUsername',
    payload: username,
  };
};

export const updateUserUniversity = (university) => {
  return {
    type: 'registerPageUserInfo/updateUserUniversity',
    payload: university,
  };
};

export const updateUserGender = (gender) => {
  return {
    type: 'registerPageUserInfo/updateUserGender',
    payload: gender,
  };
};

export const updateUserAge = (age) => {
  return {
    type: 'registerPageUserInfo/updateUserAge',
    payload: age,
  };
};

const initialUserInfo = {
  email: '',
  password: '',
  username: '',
  university: '',
  gender: '',
  age: 0,
};

export const registerPageUserInfoReducer = (
  state = initialUserInfo,
  action
) => {
  switch (action.type) {
    case 'registerPageUserInfo/updateUserInfoEmail':
      return {
        ...state,
        email: action.payload,
      };
    case 'registerPageUserInfo/updateUserInfoPassword':
      return {
        ...state,
        password: action.payload,
      };
    case 'registerPageUserInfo/updateUserInfoUsername':
      return {
        ...state,
        username: action.payload,
      };
    case 'registerPageUserInfo/updateUserUniversity':
      return {
        ...state,
        university: action.payload,
      };
    case 'registerPageUserInfo/updateUserGender':
      return {
        ...state,
        gender: action.payload,
      };
    case 'registerPageUserInfo/updateUserAge':
      return {
        ...state,
        age: action.payload,
      };
    default:
      return state;
  }
};
