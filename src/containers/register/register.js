import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationButton,
  DisabledNavigationButton,
} from '../../components/buttons/buttons.js';
import { Header } from '../../components/header/header';
import { Title } from '../../components/title/title';
import {
  EmailInputField,
  PasswordInputField,
  InputTextField,
} from '../../components/input_text_field/input_text_field';
import { InputSelect } from '../../components/input_select/input_select.js';
import { RadioSelect } from '../../components/radio_select/radio_select';
import { InputSlider } from '../../components/sliders/sliders';
import {
  checkRegisterEmailRegex,
  updateUserEmailId,
  updateUserEmailAddress,
  isEmailAvailable,
  checkPasswordRegex1,
  checkPasswordRegexAndMatch,
  updateUserUniversity,
  updateUserGender,
  updateUserAge,
  jumpToPage,
  updateCheckPassword,
  updateUserPassword,
  updateUserInfoEmail,
  updateUserInfoPassword,
  updateUsername,
  updateUserInfoUsername,
  isUsernameAvailable,
  checkPasswordMatch,
  checkUsernameLength,
} from './registerSlice';
import './register.css';
import { registerUser } from '../../firebase/firebaseAuth.js';
import {
  checkAvailableEmail,
  checkAvailableUsername,
} from '../../firebase/firebaseDb';

const titleTextEmail = '반갑습니다!\n이메일을 입력해주세요';
const titleTextPassword = '비밀번호를 입력해주세요';
const titleHelperTextPassword = '영문 대소문자, 숫자 혼용 8자 이상이어야 해요';
const titleTextUsername = '닉네임을 입력해주세요';
const titleHelperTextUsername = '최대 10자까지 허용됩니다';
const titleTextUserInfo = '본격적으로 시작하기 전\n본인 정보를 입력해주세요';
const titleHelperTextUserInfo = '맞춤 서비스를 위한 최소한의 정보만 받아요';

export const Register = (props) => {
  const { registerPage, dispatch } = props;

  return (
    <div className="Register">
      <div className="RegisterContainer">
        {registerPage === 1 ? (
          <Header transparent={true} onClick={() => dispatch(jumpToPage(1))} backRoute="/" />
        ) : (
          <Header transparent={true} onClick={() => dispatch(jumpToPage(registerPage - 1))} />
        )}
        {getRegisterPage(props)}
      </div>
      <div className="NavigationButton">{getNavigationButton(props)}</div>
    </div>
  );
};

const getRegisterPage = (props) => {
  const {
    registerPage,
    registerPageEmail,
    registerPagePassword,
    registerPageUsername,
    registerPageUserInfo,
    dispatch,
  } = props;
  switch (registerPage) {
    case 1:
      return (
        <RegisterEmailPage
          registerPageEmail={registerPageEmail}
          dispatch={dispatch}
        />
      );
    case 2:
      return (
        <RegisterPasswordPage
          registerPagePassword={registerPagePassword}
          dispatch={dispatch}
        />
      );
    case 3:
      return (
        <RegisterUsernamePage
          registerPageUsername={registerPageUsername}
          dispatch={dispatch}
        />
      );
    case 4:
      return (
        <RegisterPageUserInfo
          registerPageUserInfo={registerPageUserInfo}
          dispatch={dispatch}
        />
      );
    default:
      return (
        <RegisterEmailPage
          registerPageEmail={registerPageEmail}
          dispatch={dispatch}
        />
      );
  }
};

const getNavigationButton = (props) => {
  const {
    registerPage,
    registerPageEmail,
    registerPagePassword,
    registerPageUsername,
    registerPageUserInfo,
    dispatch,
  } = props;
  switch (registerPage) {
    case 1:
      if (
        registerPageEmail.userEmailId === '' ||
        registerPageEmail.regexError ||
        registerPageEmail.userEmailAddress === ''
      )
        return <DisabledNavigationButton buttonText="다음" />;
      else if (registerPageEmail.inavailableError)
        return (
          <NavigationButton
            buttonText="중복 확인"
            onClick={async () => {
              const userEmail = `${registerPageEmail.userEmailId}@${registerPageEmail.userEmailAddress}`;
              const emailAvailable = await checkAvailableEmail(userEmail);
              dispatch(isEmailAvailable(emailAvailable));
            }}
          />
        );
      else
        return (
          <NavigationButton
            buttonText="다음"
            onClick={async () => {
              const userEmail = `${registerPageEmail.userEmailId}@${registerPageEmail.userEmailAddress}`;
              const emailAvailable = await checkAvailableEmail(userEmail);
              if (!emailAvailable) {
                dispatch(isEmailAvailable(emailAvailable));
              } else {
                dispatch(jumpToPage(registerPage + 1));
                dispatch(updateUserInfoEmail(userEmail));
              }
            }}
          />
        );
    case 2:
      if (
        registerPagePassword.error1 ||
        registerPagePassword.error2 ||
        registerPagePassword.userPassword === '' ||
        registerPagePassword.checkPassword === ''
      )
        return <DisabledNavigationButton buttonText="다음" />;
      else
        return (
          <NavigationButton
            buttonText="다음"
            onClick={() => {
              dispatch(jumpToPage(registerPage + 1));
              dispatch(
                updateUserInfoPassword(registerPagePassword.userPassword)
              );
            }}
          />
        );
    case 3:
      if (
        registerPageUsername.username === '' ||
        registerPageUsername.lengthError
      )
        return <DisabledNavigationButton buttonText="다음" />;
      else if (registerPageUsername.inavailableError)
        return (
          <NavigationButton
            buttonText="중복 확인"
            onClick={async () => {
              const usernameAvailable = await checkAvailableUsername(
                registerPageUsername.username
              );
              dispatch(isUsernameAvailable(usernameAvailable));
            }}
          />
        );
      else
        return (
          <NavigationButton
            buttonText="다음"
            onClick={async () => {
              const usernameAvailable = await checkAvailableUsername(
                registerPageUsername.username
              );
              if (!usernameAvailable) {
                dispatch(isUsernameAvailable(usernameAvailable));
              } else {
                dispatch(jumpToPage(registerPage + 1));
                dispatch(updateUserInfoUsername(registerPageUsername.username));
              }
            }}
          />
        );
    case 4:
      if (
        registerPageUserInfo.university === '' ||
        registerPageUserInfo.gender === '' ||
        registerPageUserInfo.age === 0
      )
        return <DisabledNavigationButton buttonText="시작하기" />;
      else
        return (
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <NavigationButton
              buttonText="시작하기"
              onClick={() => {
                dispatch(jumpToPage(1));
                registerUser(
                  registerPageUserInfo.email,
                  registerPageUserInfo.password,
                  registerPageUserInfo
                );
              }}
            />
          </Link>
        );
    default:
      return (
        <NavigationButton
          buttonText="다음"
          onClick={() => dispatch(jumpToPage(registerPage + 1))}
        />
      );
  }
};

const RegisterEmailPage = (props) => {
  const { registerPageEmail, dispatch } = props;

  return (
    <div className="Page1">
      <Title titleText={titleTextEmail} />
      <div className="InputEmail">
        <EmailInputField
          onChangeField={(string) => {
            dispatch(updateUserEmailId(string));
            dispatch(checkRegisterEmailRegex(string));
          }}
          onChangeSelect={(string) => {
            dispatch(updateUserEmailAddress(string));
          }}
          emailAddress={registerPageEmail.userEmailAddress}
          helperText={registerPageEmail.helperText}
          error={registerPageEmail.regexError || registerPageEmail.inavailableError}
          label="이메일"
        />
      </div>
    </div>
  );
};

const RegisterPasswordPage = (props) => {
  const { registerPagePassword, dispatch } = props;

  return (
    <div className="Page2">
      <Title
        titleText={titleTextPassword}
        titleHelperText={titleHelperTextPassword}
      />
      <div className="InputPassword">
        <PasswordInputField
          onChange={(e) => {
            dispatch(checkPasswordRegex1(e.target.value));
            dispatch(updateUserPassword(e.target.value));
            if (registerPagePassword.checkPassword !== '')
              dispatch(checkPasswordMatch());
          }}
          helperText={registerPagePassword.helperText1}
          error={registerPagePassword.error1}
          label="비밀번호"
        />
      </div>
      <div className="CheckPassword">
        <PasswordInputField
          onChange={(e) => {
            dispatch(updateCheckPassword(e.target.value));
            dispatch(checkPasswordRegexAndMatch(e.target.value));
          }}
          helperText={registerPagePassword.helperText2}
          error={registerPagePassword.error2}
          label="비밀번호 확인"
        />
      </div>
    </div>
  );
};

const RegisterUsernamePage = (props) => {
  const { registerPageUsername, dispatch } = props;

  return (
    <div className="Page3">
      <Title
        titleText={titleTextUsername}
        titleHelperText={titleHelperTextUsername}
      />
      <div className="InputUsername">
        <InputTextField
          onChange={(e) => {
            dispatch(updateUsername(e.target.value));
            dispatch(updateUserInfoUsername(e.target.value));
            dispatch(checkUsernameLength(e.target.value));
          }}
          error={registerPageUsername.lengthError || registerPageUsername.inavailableError}
          label="닉네임"
          helperText={registerPageUsername.helperText}
        />
      </div>
    </div>
  );
};

const RegisterPageUserInfo = (props) => {
  const { registerPageUserInfo, dispatch } = props;
  return (
    <div className="Page4">
      <Title
        titleText={titleTextUserInfo}
        titleHelperText={titleHelperTextUserInfo}
      />
      <div className="InputUserInfo">
        <div className="SelectUniversity">
          <p>대학</p>
          <InputSelect
            itemValues={['서울대', '연세대', '고려대']}
            value={registerPageUserInfo.university}
            onChange={(e) => dispatch(updateUserUniversity(e.target.value))}
          />
        </div>
        <div className="SelectGender">
          <p>성별</p>
          <div className="RadioSelect">
            <RadioSelect
              value={registerPageUserInfo.gender}
              values={['남성', '여성']}
              onChange={(e) => dispatch(updateUserGender(e.target.value))}
            />
          </div>
        </div>
        <div className="SelectAge">
          <p>나이</p>
          <InputSlider
            min={20}
            max={29}
            value={registerPageUserInfo.age}
            onChange={(e, value) => dispatch(updateUserAge(value))}
          />
        </div>
      </div>
    </div>
  );
};
