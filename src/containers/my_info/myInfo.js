import React from 'react';
import { Header } from '../../components/header/header';
import { TextButton } from '../../components/buttons/buttons';
import { InputSelect } from '../../components/input_select/input_select';
import {
  EmailInputField,
  PasswordInputField,
  InputTextField,
} from '../../components/input_text_field/input_text_field';
import { RadioSelect } from '../../components/radio_select/radio_select';
import { SmallTitle } from '../../components/title/title';
import './myInfo.css';
import {
  checkPasswordRegex,
  updateInputPassword,
  isUserReauthenticated,
  jumpPersonalInfoPage,
  cancelReauthentication,
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
  updateSettingsGender,
  updateSettingsUniversity,
  updateSettingsAge,
  updateSettingsInputPassword,
  updateSettingsCheckPassword,
  checkSettingsPasswordRegexAndMatch,
  updateSettingsPassword,
  checkSettingsPasswordRegex1,
  checkSettingsPasswordMatch,
  isSettingsPasswordNew,
  cancelSettingsPasswordUpdate,
  cancelSettingsEmailUpdate,
  cancelSettingsUsernameUpdate,
  cancelSettingsGenderUpdate,
  cancelSettingsUniversityUpdate,
  cancelSettingsAgeUpdate,
  toggleMatchHistoryPage,
} from './myInfoSlice';
import {
  reauthenticateUser,
  updateAuthUserEmail,
  updateAuthUserPassword,
  updateCurrentUserGender,
  updateCurrentUserUsername,
  updateCurrentUserUniversity,
  updateCurrentUserAge,
} from '../../firebase/firebaseAuth';
import {
  checkAvailableEmail,
  checkAvailableUsername,
  updateDbUserGender,
  updateDbUserAge,
  updateDbUsername,
  updateDbUserUniversity,
} from '../../firebase/firebaseDb';
import { InputSlider } from '../../components/sliders/sliders';

export const MyInfo = (props) => {
  const { myInfoPage, myInfoSettings, currentUserInfo, dispatch } = props;

  return (
    <div className="MyInfo">
      <span className="MyInfoDot1" />
      <span className="MyInfoDot2" />
      <span className="MyInfoDot3" />
      <span className="MyInfoDot4" />
      <div className="MyInfoView">
        <div className="MyInfoHeader">
          <Header
            backRoute="/home"
            titleText="내 정보"
            onClick={() => dispatch(jumpPersonalInfoPage(1))}
          />
        </div>
        <div className="MyInfoBoxes">
          <PersonalInfoBox
            myInfoPage={myInfoPage}
            myInfoSettings={myInfoSettings}
            currentUserInfo={currentUserInfo}
            dispatch={dispatch}
          />
          <MatchHistoryBox myInfoPage={myInfoPage} dispatch={dispatch} />
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

// Personal Info Box code below

const PersonalInfoBox = (props) => {
  const { myInfoPage, myInfoSettings, currentUserInfo, dispatch } = props;

  switch (myInfoPage.personalInfoPage) {
    case 1:
      return (
        <DisplayPersonalInfoBox
          currentUserInfo={currentUserInfo}
          dispatch={dispatch}
        />
      );
    case 2:
      return (
        <ReauthenticateUserBox myInfoPage={myInfoPage} dispatch={dispatch} />
      );
    case 3:
      return (
        <ChangePersonalInfoBox
          currentUserInfo={currentUserInfo}
          dispatch={dispatch}
        />
      );
    case 4:
      return (
        <ChangeEmailBox
          myInfoSettings={myInfoSettings}
          currentUserInfo={currentUserInfo}
          dispatch={dispatch}
        />
      );
    case 5:
      return (
        <ChangeUsernameBox
          myInfoSettings={myInfoSettings}
          currentUserInfo={currentUserInfo}
          dispatch={dispatch}
        />
      );
    case 6:
      return (
        <ChangeGenderBox myInfoSettings={myInfoSettings} dispatch={dispatch} />
      );
    case 7:
      return (
        <ChangeUniversityBox
          myInfoSettings={myInfoSettings}
          dispatch={dispatch}
        />
      );
    case 8:
      return (
        <ChangeAgeBox myInfoSettings={myInfoSettings} dispatch={dispatch} />
      );
    case 9:
      return (
        <ChangePasswordBox
          myInfoSettings={myInfoSettings}
          currentUserInfo={currentUserInfo}
          dispatch={dispatch}
        />
      );
    default:
      return (
        <DisplayPersonalInfoBox
          currentUserInfo={currentUserInfo}
          dispatch={dispatch}
        />
      );
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
            dispatch(cancelReauthentication());
          }}
        />
        <TextButton
          buttonText="확인"
          color="#EF515F"
          onClick={async () => {
            const validPassword = await reauthenticateUser(
              myInfoPage.inputPassword
            );
            if (validPassword) {
              dispatch(jumpPersonalInfoPage(3));
            } else {
              dispatch(isUserReauthenticated(validPassword));
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
      <div style={{ alignSelf: 'flex-end' }}>
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
            dispatch(cancelSettingsEmailUpdate());
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
              updateAuthUserEmail(userEmail, dispatch);
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
            dispatch(cancelSettingsUsernameUpdate());
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
              dispatch(
                updateCurrentUserUsername(myInfoSettings.personalInfo.username)
              );
              dispatch(jumpPersonalInfoPage(3));
            }
          }}
        />
      </div>
    </div>
  );
};

const ChangeGenderBox = (props) => {
  const { myInfoSettings, dispatch } = props;
  return (
    <div className="PersonalInfoBox">
      <p className="BoxTitleElement">개인정보 {'>'} 성별</p>
      <SmallTitle titleText="성별을 입력해주세요" />
      <div style={{ paddingLeft: '10px' }}>
        <RadioSelect
          value={myInfoSettings.personalInfo.gender}
          values={['남성', '여성']}
          onChange={(e) => dispatch(updateSettingsGender(e.target.value))}
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
            dispatch(cancelSettingsGenderUpdate());
          }}
        />
        <TextButton
          buttonText="확인"
          color="#EF515F"
          onClick={(e) => {
            updateDbUserGender(myInfoSettings.personalInfo.gender);
            dispatch(
              updateCurrentUserGender(myInfoSettings.personalInfo.gender)
            );
            dispatch(jumpPersonalInfoPage(3));
          }}
        />
      </div>
    </div>
  );
};

const ChangeUniversityBox = (props) => {
  const { myInfoSettings, dispatch } = props;
  return (
    <div className="PersonalInfoBox">
      <p className="BoxTitleElement">개인정보 {'>'} 대학</p>
      <SmallTitle titleText="대학 정보를 입력해주세요" />
      <div style={{ paddingLeft: '10px', display: 'flex' }}>
        <p style={{ fontWeight: 'bold' }}>대학 선택</p>
        <InputSelect
          itemValues={['서울대', '연세대', '고려대']}
          value={myInfoSettings.personalInfo.university}
          onChange={(e) => dispatch(updateSettingsUniversity(e.target.value))}
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
            dispatch(cancelSettingsUniversityUpdate());
          }}
        />
        <TextButton
          buttonText="확인"
          color="#EF515F"
          onClick={(e) => {
            updateDbUserUniversity(myInfoSettings.personalInfo.university);
            dispatch(
              updateCurrentUserUniversity(
                myInfoSettings.personalInfo.university
              )
            );
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
      <div style={{ width: '90%', alignSelf: 'center' }}>
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
            dispatch(cancelSettingsAgeUpdate());
          }}
        />
        <TextButton
          buttonText="확인"
          color="#EF515F"
          onClick={(e) => {
            updateDbUserAge(myInfoSettings.personalInfo.age);
            dispatch(updateCurrentUserAge(myInfoSettings.personalInfo.age));
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
        titleHelperText={
          '비밀번호는 영문 대소문자 및 숫자를 포함해\n 8자 이상이어야 합니다'
        }
      />
      <PasswordInputField
        label="새 비밀번호"
        error={myInfoSettings.passwordError1}
        onChange={(e) => {
          dispatch(updateSettingsInputPassword(e.target.value));
          dispatch(updateSettingsPassword(e.target.value));
          dispatch(checkSettingsPasswordRegex1(e.target.value));
          if (myInfoSettings.checkPassword !== '')
            dispatch(checkSettingsPasswordMatch());
        }}
        helperText={myInfoSettings.passwordHelperText1}
      />
      <PasswordInputField
        label="비밀번호 확인"
        error={myInfoSettings.passwordError2}
        onChange={(e) => {
          dispatch(updateSettingsCheckPassword(e.target.value));
          dispatch(checkSettingsPasswordRegexAndMatch());
        }}
        helperText={myInfoSettings.passwordHelperText2}
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
            dispatch(cancelSettingsPasswordUpdate());
          }}
        />
        <TextButton
          buttonText="확인"
          color="#EF515F"
          onClick={(e) => {
            const newPassword =
              myInfoSettings.personalInfo.password !==
              currentUserInfo.userInfo.password;
            if (!newPassword) {
              dispatch(isSettingsPasswordNew(newPassword));
            } else {
              updateAuthUserPassword(
                myInfoSettings.personalInfo.password,
                dispatch
              );
              dispatch(jumpPersonalInfoPage(3));
            }
          }}
        />
      </div>
    </div>
  );
};

// Match History Box code below

const MatchHistoryBox = (props) => {
  const { myInfoPage, dispatch } = props;

  return (
    <div className="MatchHistoryBox">
      <p className="BoxTitleElement">미팅 정보</p>
      <DisplayPreviousMatch myInfoPage={myInfoPage} dispatch={dispatch} />
      <DisplayPresentMatch myInfoPage={myInfoPage} dispatch={dispatch} />
      <DisplayWaitingMatch myInfoPage={myInfoPage} dispatch={dispatch} />
    </div>
  );
};

const getMatchDateBoxStyles = (type) => {
  switch (type) {
    case 'previous':
      return {
        width: '90%',
        margin: '5px',
        padding: '10px',
        border: '1px solid #EF515F',
        borderRadius: '7px',
        alignSelf: 'center',
      };
    case 'present':
      return {
        width: '90%',
        margin: '5px',
        padding: '10px',
        background: 'linear-gradient(to left top, #EF515F, #FBD0CA)',
        borderRadius: '7px',
        alignSelf: 'center',
      };
    case 'waiting':
      return {
        width: '90%',
        margin: '5px',
        padding: '10px',
        border: '1px solid #EF515F',
        borderRadius: '7px',
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'space-between',
      };
  }
};

const DisplayMatchDateBox = (props) => {
  const { type, dates, matchId, dispatch } = props;

  if (type === 'waiting')
    return matchId.map((id, index) => (
      <div key={index} style={getMatchDateBoxStyles(type)}>
        <p style={{ margin: '5px 10px' }}>매칭까지 남은 시간: <br /> 약 13 : 38 : 05</p>
        <TextButton
          buttonText="수정하기"
          color="#EF515F"
          onClick={(e) => {
            //todo(sounho): implement onClick function
          }}
        />
      </div>
    ));
  else
    return dates.map((date, index) => (
      <div key={index} style={getMatchDateBoxStyles(type)}>
        <p style={{ margin: '5px 10px' }}>{date}</p>
      </div>
    ));
};

const DisplayPreviousMatch = (props) => {
  const { myInfoPage, dispatch } = props;

  if (!myInfoPage.matchHistoryPage.previousMatch)
    return (
      <div className="BoxElementWithButton">
        <p className="BoxElement">성사된 미팅</p>
        <TextButton
          buttonText="자세히"
          color="#EF515F"
          onClick={(e) => {
            dispatch(toggleMatchHistoryPage('previousMatch'));
          }}
        />
      </div>
    );
  else
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <div className="BoxElementWithButton">
          <p className="BoxElement">성사된 미팅</p>
          <TextButton
            buttonText="간단히"
            color="#EF515F"
            onClick={(e) => {
              dispatch(toggleMatchHistoryPage('previousMatch'));
            }}
          />
        </div>
        <div
          style={{
            margin: '5px 0',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <DisplayMatchDateBox
            type="previous"
            dates={['2021. 06. 11 금요일', '2021. 06. 19 토요일']}
          />
        </div>
      </div>
    );
};

const DisplayPresentMatch = (props) => {
  const { myInfoPage, dispatch } = props;

  if (!myInfoPage.matchHistoryPage.presentMatch)
    return (
      <div className="BoxElementWithButton">
        <p className="BoxElement">매칭된 미팅</p>
        <TextButton
          buttonText="자세히"
          color="#EF515F"
          onClick={(e) => {
            dispatch(toggleMatchHistoryPage('presentMatch'));
          }}
        />
      </div>
    );
  else
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <div className="BoxElementWithButton">
          <p className="BoxElement">매칭된 미팅</p>
          <TextButton
            buttonText="간단히"
            color="#EF515F"
            onClick={(e) => {
              dispatch(toggleMatchHistoryPage('presentMatch'));
            }}
          />
        </div>
        <div
          style={{
            margin: '5px 0',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <DisplayMatchDateBox
            type="present"
            dates={['2021. 07. 04 일요일', '2021. 07. 10 토요일']}
          />
        </div>
      </div>
    );
};

const DisplayWaitingMatch = (props) => {
  const { myInfoPage, dispatch } = props;

  if (!myInfoPage.matchHistoryPage.waitingMatch)
    return (
      <div className="BoxElementWithButton">
        <p className="BoxElement">매칭 대기중인 미팅</p>
        <TextButton
          buttonText="자세히"
          color="#EF515F"
          onClick={(e) => {
            dispatch(toggleMatchHistoryPage('waitingMatch'));
          }}
        />
      </div>
    );
  else
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <div className="BoxElementWithButton">
          <p className="BoxElement">매칭 대기중인 미팅</p>
          <TextButton
            buttonText="간단히"
            color="#EF515F"
            onClick={(e) => {
              dispatch(toggleMatchHistoryPage('waitingMatch'));
            }}
          />
        </div>
        <div
          style={{
            margin: '5px 0',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <DisplayMatchDateBox
            type="waiting"
            matchId={['2021. 07. 04 일요일']}
            dispatch={dispatch}
          />
        </div>
      </div>
    );
};
