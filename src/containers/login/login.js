import React from 'react';
import { useHistory } from 'react-router-dom';
import { RegisterOrLoginButton } from '../../components/buttons/buttons.js';
import { Header } from '../../components/header/header';
import { Title } from '../../components/title/title';
import {
  InputTextField,
  PasswordInputField,
} from '../../components/input_text_field/input_text_field';
import {
  updateLoginEmail,
  updateLoginPassword,
  checkLoginEmailRegex,
  isValidLoginPassword,
} from './loginSlice';
import { loginUser } from '../../firebase/firebaseAuth.js';
import './login.css';

const loginTitleText = '이메일이나 닉네임으로\n로그인이 가능합니다';

export const Login = (props) => {
  const { loginPage, dispatch } = props;
  const history = useHistory();

  return (
    <div className="Login">
      <div className="LoginContainer">
        <Header backRoute="/" />
        <Title titleText={loginTitleText} />
        <div className="InputLoginInfo">
          <div className="InputLoginEmail">
            <InputTextField
              error={loginPage.emailRegexError}
              helperText={loginPage.emailHelperText}
              onChange={(e) => {
                dispatch(checkLoginEmailRegex(e.target.value));
                dispatch(updateLoginEmail(e.target.value));
              }}
              label="이메일"
              width="80vw"
            />
          </div>
          <div className="InputLoginPassword">
            <PasswordInputField
              error={loginPage.invalidPassword}
              label="비밀번호"
              helperText={loginPage.passwordHelperText}
              onChange={(e) => dispatch(updateLoginPassword(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="LoginButton">
        <RegisterOrLoginButton
          buttonText="로그인"
          onClick={async () => {
            const loginSuccess = await loginUser(
              loginPage.email,
              loginPage.password
            );
            dispatch(isValidLoginPassword(loginSuccess));
            if (loginSuccess) {
              history.push('/home');
            }
          }}
        />
      </div>
    </div>
  );
};
