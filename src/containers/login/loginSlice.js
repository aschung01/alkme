export const updateLoginEmail = (email) => {
  return {
    type: 'loginPage/updateLoginEmail',
    payload: email,
  }
}

export const updateLoginPassword = (password) => {
  return {
    type: 'loginPage/updateLoginPassword',
    payload: password,
  }
}

export const checkLoginEmailRegex = (email) => {
  const isLoginEmailValid = checkLoginEmailValid(email);
  return {
    type: 'loginPage/checkLoginEmailRegex',
    payload: isLoginEmailValid,
  }
}

const checkLoginEmailValid = (email) => {
  const regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-])+@([a-zA-Z0-9.-])+$/;
  return regex.test(email);
}

export const isValidLoginPassword = (passwordValid) => {
  return {
    type: 'loginPage/isValidLoginPassword',
    payload: passwordValid,
  }
}

const initialLoginState = {
  email: '',
  password: '',
  emailRegexError: false,
  emailHelperText: '',
  invalidPassword: false,
  passwordHelperText: '',
}

export const loginPageReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case 'loginPage/updateLoginEmail':
      return {
        ...state,
        email: action.payload,
      }
    case 'loginPage/updateLoginPassword':
      return {
        ...state,
        password: action.payload,
      }
    case 'loginPage/checkLoginEmailRegex':
      return {
        ...state,
        emailRegexError: !action.payload,
        emailHelperText: !action.payload ? '이메일 형식이 올바르지 않습니다' : '',
      }
    case 'loginPage/isValidLoginPassword':
      return {
        ...state,
        invalidPassword: !action.payload,
        passwordHelperText: !action.payload ? '비밀번호가 올바르지 않습니다' : '',
      }
    default:
      return state;
  }
}