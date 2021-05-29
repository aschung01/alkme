import React from 'react';
import { Header } from '../../components/header/header';
import {
  SelectUniversityButton,
  TextButton,
} from '../../components/buttons/buttons';
import { InputSelect } from '../../components/input_select/input_select';
import {
  EmailInputField,
  PasswordInputField,
  InputTextField,
} from '../../components/input_text_field/input_text_field';
import { SmallTitle } from '../../components/title/title';
import './myInfo.css';
import {
  checkPasswordRegex,
  updateInputPassword,
  isUserReauthenticated,
  jumpPersonalInfoPage,
  toggleShowCurrentMatch,
  toggleShowPreviousMatch,
  toggleShowWaitingMatch,
  updateSettingsEmail,
  updateSettingsEmailId,
  updateSettingsEmailAddress,
  isSettingsEmailAvailable,
  isSettingsEmailNew,
  checkSettingsEmailRegex,
  updateSettingsUsername,
  checkSettingsUsernameRegex,
  isSettingsUsernameAvailable,
  isSettingsUsernameNew,
  updateSettingsUniversity,
  updateSettingsAge,
} from './myInfoSlice';
import {
  reauthenticateUser,
  updateAuthUserEmail,
} from '../../firebase/firebaseAuth';
import {
  checkAvailableEmail,
  checkAvailableUsername,
  updateDbUsername,
} from '../../firebase/firebaseDb';
import { InputSlider } from '../../components/sliders/sliders';

export const MyInfo = (props) => {
  const { currentUserInfo, myInfoPage, myInfoSettings, dispatch } = props;

  return (
    <div className="MyInfo">
      <span className="MyInfoDot1" />
      <span className="MyInfoDot2" />
      <span className="MyInfoDot3" />
      <span className="MyInfoDot4" />
      <div className="MyInfoView">
        <Header
          backRoute="/home"
          titleText="내 정보"
          onClick={() => dispatch(jumpPersonalInfoPage(1))}
        />
        <div className="MyInfoBoxes">
          {PersonalInfoBox(props)}
          <div className="MatchHistoryBox">
            <p className="BoxTitleElement">미팅 정보</p>
            <div className="BoxElementWithButton">
              <p className="BoxElement">성사된 미팅</p>
              <TextButton buttonText="자세히" color="#EF515F" />
            </div>
            <div className="BoxElementWithButton">
              <p className="BoxElement">매칭된 미팅</p>
              <TextButton buttonText="자세히" color="#EF515F" />
            </div>
            <div className="BoxElementWithButton">
              <p className="BoxElement">매칭 대기중인 미팅</p>
              <TextButton buttonText="자세히" color="#EF515F" />
            </div>
          </div>
          <div className="MyLevelBox">
            <p className="BoxTitleElement">내 등급</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonalInfoBox = (props) => {
  const { myInfoPage } = props;

  switch (myInfoPage.personalInfoPage) {
    case 1:
      return DisplayPersonalInfoBox(props);
    case 2:
      return ReauthenticateUserBox(props);
    case 3:
      return ChangePersonalInfoBox(props);
    case 4:
      return ChangeEmailBox(props);
    case 5:
      return ChangeUsernameBox(props);
    case 6:
      return ChangeGenderBox(props);
    case 7:
      return ChangeUniversityBox(props);
    case 8:
      return ChangeAgeBox(props);
    case 9:
      return ChangePasswordBox(props);
    default:
      return ReauthenticateUserBox(props);
  }
};

const DisplayPersonalInfoBox = (props) => {
  const { currentUserInfo, dispatch } = props;

  return (
    <div className="PersonalInfoBox">
      <div className="BoxElementWithButton">
        <p className="BoxTitleElement">개인정보</p>
        <TextButton
          buttonText="변경"
          color="#EF515F"
          onClick={(e) => {
            dispatch(jumpPersonalInfoPage(2));
          }}
        />
      </div>
      <p className="BoxElement">{currentUserInfo.userInfo.email}</p>
      <p className="BoxElement">{currentUserInfo.userInfo.username}</p>
      <p className="BoxElement">{currentUserInfo.userInfo.university}</p>
      <p className="BoxElement">{currentUserInfo.userInfo.age}세</p>
    </div>
  );
};

const ReauthenticateUserBox = (props) => {
  const { myInfoPage, dispatch } = props;
  return (
    <div className="PersonalInfoBox">
      <div className="BoxElementWithButton">
        <TextButton
          buttonText="이전"
          color="#EF515F"
          onClick={(e) => {
            dispatch(jumpPersonalInfoPage(1));
          }}
        />
        <TextButton
          buttonText="확인"
          color="#EF515F"
          onClick={async () => {
            const validPassword = await reauthenticateUser(
              myInfoPage.inputPassword
            );
            dispatch(isUserReauthenticated(validPassword));
            if (validPassword) {
              dispatch(jumpPersonalInfoPage(3));
            }
          }}
        />
      </div>
      <p className="BoxElement">
        개인정보를 변경하려면
        <br />
        비밀번호를 다시 입력해주세요
      </p>
      <PasswordInputField
        label="비밀번호"
        helperText={myInfoPage.passwordHelperText}
        onChange={(e) => {
          dispatch(checkPasswordRegex(e.target.value));
          dispatch(updateInputPassword(e.target.value));
        }}
        error={myInfoPage.passwordRegexError || myInfoPage.passwordMatchError}
      />
    </div>
  );
};

const ChangePersonalInfoBox = (props) => {
  const { currentUserInfo, dispatch } = props;

  return (
    <div className="PersonalInfoBox">
      <div className="BoxElementWithButton">
        <p className="BoxTitleElement">개인정보</p>
        <TextButton
          buttonText="완료"
          color="#EF515F"
          onClick={(e) => {
            dispatch(jumpPersonalInfoPage(1));
          }}
        />
      </div>
      <div className="BoxElementWithButton">
        <p className="BoxElement">{currentUserInfo.userInfo.email}</p>
        <TextButton
          buttonText="수정"
          color="#EF515F"
          onClick={(e) => {
            dispatch(jumpPersonalInfoPage(4));
          }}
        />
      </div>
      <div className="BoxElementWithButton">
        <p className="BoxElement">{currentUserInfo.userInfo.username}</p>
        <TextButton
          buttonText="수정"
          color="#EF515F"
          onClick={(e) => {
            dispatch(jumpPersonalInfoPage(5));
          }}
        />
      </div>
      <div className="BoxElementWithButton">
        <p className="BoxElement">{currentUserInfo.userInfo.gender}</p>
        <TextButton
          buttonText="수정"
          color="#EF515F"
          onClick={(e) => {
            dispatch(jumpPersonalInfoPage(6));
          }}
        />
      </div>
      <div className="BoxElementWithButton">
        <p className="BoxElement">{currentUserInfo.userInfo.university}</p>
        <TextButton
          buttonText="수정"
          color="#EF515F"
          onClick={(e) => {
            dispatch(jumpPersonalInfoPage(7));
          }}
        />
      </div>
      <div className="BoxElementWithButton">
        <p className="BoxElement">{currentUserInfo.userInfo.age}</p>
        <TextButton
          buttonText="수정"
          color="#EF515F"
          onClick={(e) => {
            dispatch(jumpPersonalInfoPage(8));
          }}
        />
      </div>
      <div className="BoxElementWithButton">
        <TextButton
          buttonText="비밀번호 변경"
          color="#EF515F"
          onClick={(e) => {
            dispatch(jumpPersonalInfoPage(9));
          }}
        />
      </div>
    </div>
  );
};

const ChangeEmailBox = (props) => {
  const { myInfoSettings, currentUserInfo, dispatch } = props;

  return (
    <div className="PersonalInfoBox">
      <p className="BoxTitleElement">개인정보 {'>'} 이메일</p>
      <SmallTitle titleText="새 이메일을 입력해주세요" />
      <EmailInputField
        onChangeField={(string) => {
          dispatch(updateSettingsEmailId(string));
          dispatch(checkSettingsEmailRegex(string));
        }}
        onChangeSelect={(string) => {
          dispatch(updateSettingsEmailAddress(string));
        }}
        emailAddress={myInfoSettings.settingsEmailAddress}
        helperText={myInfoSettings.emailHelperText}
        error={
          myInfoSettings.emailRegexError ||
          myInfoSettings.emailInavailableError ||
          myInfoSettings.emailNotNewError
        }
        label="이메일"
      />
      <div
        className="BoxElementWithButton"
        style={{ flexWrap: 'wrap', marginTop: '15px' }}
      >
        <TextButton
          buttonText="취소"
          color="#EF515F"
          onClick={() => {
            dispatch(jumpPersonalInfoPage(3));
          }}
        />
        <TextButton
          buttonText="확인"
          color="#EF515F"
          onClick={async (e) => {
            const userEmail = `${myInfoSettings.settingsEmailId}@${myInfoSettings.settingsEmailAddress}`;
            const emailAvailable = await checkAvailableEmail(userEmail);
            const newEmail = userEmail !== currentUserInfo.userInfo.email;
            if (!newEmail) {
              dispatch(isSettingsEmailNew(newEmail));
            } else if (!emailAvailable) {
              dispatch(isSettingsEmailAvailable(emailAvailable));
            } else {
              dispatch(updateSettingsEmail(userEmail));
              updateAuthUserEmail(userEmail);
              dispatch(jumpPersonalInfoPage(3));
            }
          }}
        />
      </div>
    </div>
  );
};

const ChangeUsernameBox = (props) => {
  const { myInfoSettings, currentUserInfo, dispatch } = props;
  return (
    <div className="PersonalInfoBox">
      <p className="BoxTitleElement">개인정보 {'>'} 닉네임</p>
      <SmallTitle titleText="새 닉네임을 입력해주세요" />
      <InputTextField
        onChange={(e) => {
          dispatch(updateSettingsUsername(e.target.value));
          dispatch(checkSettingsUsernameRegex(e.target.value));
        }}
        error={
          myInfoSettings.usernameRegexError ||
          myInfoSettings.usernameInavailableError
        }
        label="닉네임"
        helperText={myInfoSettings.usernameHelperText}
        width="70vw"
      />
      <div
        className="BoxElementWithButton"
        style={{ flexWrap: 'wrap', marginTop: '15px' }}
      >
        <TextButton
          buttonText="취소"
          color="#EF515F"
          onClick={() => {
            dispatch(jumpPersonalInfoPage(3));
          }}
        />
        <TextButton
          buttonText="확인"
          color="#EF515F"
          onClick={async (e) => {
            const newUsername =
              myInfoSettings.personalInfo.username !==
              currentUserInfo.userInfo.username;
            const usernameAvailable = await checkAvailableUsername(
              myInfoSettings.personalInfo.username
            );
            if (!newUsername) {
              dispatch(isSettingsUsernameNew(newUsername));
            } else if (!usernameAvailable) {
              dispatch(isSettingsUsernameAvailable(usernameAvailable));
            } else {
              updateDbUsername(myInfoSettings.personalInfo.username);
              dispatch(jumpPersonalInfoPage(3));
            }
          }}
        />
      </div>
    </div>
  );
};

const ChangeGenderBox = (props) => {
  const { currentUserInfo, myInfoSettings, dispatch } = props;
  return (
    <div className="PersonalInfoBox">
      <p className="BoxTitleElement">개인정보 {'>'} 성별</p>
      <SmallTitle titleText="성별을 입력해주세요" />
      <InputTextField
        onChange={(e) => {
          dispatch(updateSettingsUsername(e.target.value));
          dispatch(checkSettingsUsernameRegex(e.target.value));
        }}
        error={
          myInfoSettings.usernameRegexError ||
          myInfoSettings.usernameInavailableError
        }
        label="닉네임"
        helperText={myInfoSettings.usernameHelperText}
        width="70vw"
      />
      <div
        className="BoxElementWithButton"
        style={{ flexWrap: 'wrap', marginTop: '15px' }}
      >
        <TextButton
          buttonText="취소"
          color="#EF515F"
          onClick={() => {
            dispatch(jumpPersonalInfoPage(3));
          }}
        />
        <TextButton
          buttonText="확인"
          color="#EF515F"
          onClick={async (e) => {
            const newUsername =
              myInfoSettings.personalInfo.username !==
              currentUserInfo.userInfo.username;
            const usernameAvailable = await checkAvailableUsername(
              myInfoSettings.personalInfo.username
            );
            if (!newUsername) {
              dispatch(isSettingsUsernameNew(newUsername));
            } else if (!usernameAvailable) {
              dispatch(isSettingsUsernameAvailable(usernameAvailable));
            } else {
              updateDbUsername(myInfoSettings.personalInfo.username);
              dispatch(jumpPersonalInfoPage(3));
            }
          }}
        />
      </div>
    </div>
  );
};

const ChangeUniversityBox = (props) => {
  const { currentUserInfo, myInfoSettings, dispatch } = props;
  return (
    <div className="PersonalInfoBox">
      <p className="BoxTitleElement">개인정보 {'>'} 대학</p>
      <SmallTitle titleText="대학 정보를 입력해주세요" />
      <InputSelect
        itemValues={['서울대', '연세대', '고려대']}
        value={myInfoSettings.personalInfo.university}
        onChange={(e) => dispatch(updateSettingsUniversity(e.target.value))}
      />
      <div
        className="BoxElementWithButton"
        style={{ flexWrap: 'wrap', marginTop: '15px' }}
      >
        <TextButton
          buttonText="취소"
          color="#EF515F"
          onClick={() => {
            dispatch(jumpPersonalInfoPage(3));
          }}
        />
        <TextButton
          buttonText="확인"
          color="#EF515F"
          onClick={(e) => {
            dispatch(jumpPersonalInfoPage(3));
          }}
        />
      </div>
    </div>
  );
};

const ChangeAgeBox = (props) => {
  const { myInfoSettings, dispatch } = props;
  return (
    <div className="PersonalInfoBox">
      <p className="BoxTitleElement">개인정보 {'>'} 나이</p>
      <SmallTitle titleText="나이를 입력해주세요" />
      <div style={{width: '90%', alignSelf: 'center'}}>
        <InputSlider
          min={20}
          max={29}
          value={myInfoSettings.personalInfo.age}
          onChange={(e, value) => dispatch(updateSettingsAge(value))}
        />
      </div>
      <div
        className="BoxElementWithButton"
        style={{ flexWrap: 'wrap', marginTop: '15px' }}
      >
        <TextButton
          buttonText="취소"
          color="#EF515F"
          onClick={() => {
            dispatch(jumpPersonalInfoPage(3));
          }}
        />
        <TextButton
          buttonText="확인"
          color="#EF515F"
          onClick={(e) => {
            dispatch(jumpPersonalInfoPage(3));
          }}
        />
      </div>
    </div>
  );
};

const ChangePasswordBox = (props) => {
  const { currentUserInfo, myInfoSettings, dispatch } = props;
  return (
    <div className="PersonalInfoBox">
      <p className="BoxTitleElement">개인정보 {'>'} 비밀번호 변경</p>
      <SmallTitle
        titleText="새 비밀번호를 입력해주세요"
        titleHelperText="비밀번호는 영문 대소문자 및 숫자를 포함해 8자 이상이어야 합니다"
      />

      <div
        className="BoxElementWithButton"
        style={{ flexWrap: 'wrap', marginTop: '15px' }}
      >
        <TextButton
          buttonText="취소"
          color="#EF515F"
          onClick={() => {
            dispatch(jumpPersonalInfoPage(3));
          }}
        />
        <TextButton
          buttonText="확인"
          color="#EF515F"
          onClick={(e) => {
            dispatch(jumpPersonalInfoPage(3));
          }}
        />
      </div>
    </div>
  );
};
