import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationButton,
  OptionButton,
  SelectUniversityButton,
  DisabledNavigationButton,
  SelectedOptionButton,
  AddButton,
} from '../../components/buttons/buttons.js';
import { Header } from '../../components/header/header.js';
import { InputRangeSlider } from '../../components/sliders/sliders';
import { InputTextField } from '../../components/input_text_field/input_text_field.js';
import { Title } from '../../components/title/title.js';
import {
  jumpToPage,
  updateInputMatchType,
  updateInputNumPersons,
  updateMatchPageFriendUsername,
  updateInputFriendUsernameData,
  deleteInputFriendUsernameData,
  friendUsernameAvailable,
  selectUniversity,
  updateAgeRange,
  enableNavigationButton,
  updateInputMatchUniversities,
  updateInputMatchInfoAgeRange,
  checkFriendUsernameRegex,
  resetInputMatchInfo,
  newFriendUsername,
  isUserUsername,
  resolveFriendUsernameErrors,
} from './matchSlice';
import './match.css';
import {
  checkFriendUsernameAvailable,
  updateDbEnrolledMatchLists,
} from '../../firebase/firebaseDb';
import { ChipsArray } from '../../components/chips_array/chips_array.js';

const matchTypePageTitleText = '나가려는 미팅의\n종류를 선택해주세요';
const numPersonsPageTitleText = '미팅에 함께\n나갈 사람이 있나요?';
const friendUsernamePageTitleText = '함께 나갈 친구의\n닉네임을 입력해주세요';
const matchConditionsPageTitleText =
  '희망하시는 미팅 상대의\n 대학, 나이를 알려주세요';
const matchNotifyPageTitleText = '마지막 단계에요!\n안내사항을 읽어주세요';

function Match(props) {
  const {
    currentUserInfo,
    matchPage,
    matchPageFriendUsername,
    matchConditions,
    inputMatchInfo,
    dispatch,
  } = props;
  return (
    <div className="Match">
      <div className="Background1" />
      <div className="Background2" />
      <MatchPageHeader
        matchPage={matchPage}
        inputMatchInfo={inputMatchInfo}
        dispatch={dispatch}
      />
      <MatchPageContent
        currentUserInfo={currentUserInfo}
        matchPage={matchPage}
        matchPageFriendUsername={matchPageFriendUsername}
        matchConditions={matchConditions}
        inputMatchInfo={inputMatchInfo}
        dispatch={dispatch}
      />
      <div className="NavigationButton">
        <MatchPageNavigationButton
          currentUserInfo={currentUserInfo}
          matchPage={matchPage}
          matchConditions={matchConditions}
          inputMatchInfo={inputMatchInfo}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}

const MatchPageHeader = (props) => {
  const { matchPage, inputMatchInfo, dispatch } = props;
  switch (matchPage) {
    case 1:
      return (
        <Header
          onClick={() => {
            dispatch(jumpToPage(1));
            dispatch(resetInputMatchInfo());
          }}
          backRoute="/home"
        />
      );
    case 2:
      return <Header onClick={() => dispatch(jumpToPage(matchPage - 1))} />;
    case 3:
      if (inputMatchInfo.numPersons === 1)
        return <Header onClick={() => dispatch(jumpToPage(matchPage - 2))} />;
      else if (inputMatchInfo.numPersons === 2)
        return <Header onClick={() => dispatch(jumpToPage(matchPage - 1))} />;
      break;
    default:
      return <Header onClick={() => dispatch(jumpToPage(matchPage - 1))} />;
  }
};

const MatchPageContent = (props) => {
  const {
    currentUserInfo,
    matchPage,
    matchPageFriendUsername,
    matchConditions,
    inputMatchInfo,
    dispatch,
  } = props;
  switch (matchPage) {
    case 1:
      return (
        <MatchTypePage inputMatchInfo={inputMatchInfo} dispatch={dispatch} />
      );
    case 2:
      return (
        <WithFriendPage inputMatchInfo={inputMatchInfo} dispatch={dispatch} />
      );
    case 3:
      return (
        <FriendUsernamePage
          currentUserInfo={currentUserInfo}
          matchPageFriendUsername={matchPageFriendUsername}
          inputMatchInfo={inputMatchInfo}
          dispatch={dispatch}
        />
      );
    case 4:
      return (
        <MatchConditionsPage
          inputMatchInfo={inputMatchInfo}
          matchConditions={matchConditions}
          dispatch={dispatch}
        />
      );
    case 5:
      return (
        <MatchNotifyPage inputMatchInfo={inputMatchInfo} dispatch={dispatch} />
      );
    default:
      return (
        <MatchTypePage inputMatchInfo={inputMatchInfo} dispatch={dispatch} />
      );
  }
};

const MatchPageNavigationButton = (props) => {
  const {
    currentUserInfo,
    matchPage,
    matchConditions,
    inputMatchInfo,
    dispatch,
  } = props;
  switch (matchPage) {
    case 1:
      if (inputMatchInfo.matchType === 0)
        return <DisabledNavigationButton buttonText="다음" />;
      else
        return (
          <NavigationButton
            buttonText="다음"
            onClick={() => dispatch(jumpToPage(matchPage + 1))}
          />
        );
    case 2:
      if (inputMatchInfo.numPersons === 0)
        return <DisabledNavigationButton buttonText="다음" />;
      else
        return (
          <NavigationButton
            buttonText="다음"
            onClick={() => {
              if (inputMatchInfo.numPersons === 2)
                dispatch(jumpToPage(matchPage + 1));
              else if (inputMatchInfo.numPersons === 1)
                dispatch(jumpToPage(matchPage + 2));
            }}
          />
        );
    case 3:
      if (inputMatchInfo.friendUsernameData.length === 0)
        return <DisabledNavigationButton buttonText="다음" />;
      else
        return (
          <NavigationButton
            buttonText="다음"
            onClick={() => {
              dispatch(jumpToPage(matchPage + 1));
            }}
          />
        );
    case 4:
      if (
        !matchConditions.enableNavigationButton ||
        matchConditions.selectedUniversity.length === 0
      )
        return <DisabledNavigationButton buttonText="다음" />;
      else
        return (
          <NavigationButton
            buttonText="다음"
            onClick={() => {
              dispatch(jumpToPage(matchPage + 1));
              dispatch(
                updateInputMatchUniversities(matchConditions.selectedUniversity)
              );
              dispatch(updateInputMatchInfoAgeRange(matchConditions.ageRange));
            }}
          />
        );

    case 5:
      return (
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <NavigationButton
            buttonText="등록하기"
            onClick={() => {
              dispatch(jumpToPage(1));
              updateDbEnrolledMatchLists(
                currentUserInfo.userInfo,
                inputMatchInfo
              );
            }}
          />
        </Link>
      );
    default:
      return (
        <NavigationButton
          buttonText="다음"
          onClick={() => dispatch(jumpToPage(matchPage + 1))}
        />
      );
  }
};

const MatchTypePage = (props) => {
  const { inputMatchInfo, dispatch } = props;

  return (
    <div className="MatchPage1">
      <div className="MatchTitle">
        <Title titleText={matchTypePageTitleText} />
      </div>
      <div className="SelectMatchType">
        {inputMatchInfo.matchType !== 2 ? (
          <OptionButton
            buttonText="2 대 2 미팅"
            onClick={() => dispatch(updateInputMatchType(2))}
          />
        ) : (
          <SelectedOptionButton
            buttonText="2 대 2 미팅"
            onClick={() => dispatch(updateInputMatchType(0))}
          />
        )}
        {inputMatchInfo.matchType !== 3 ? (
          <OptionButton
            buttonText="3 대 3 미팅"
            onClick={() => dispatch(updateInputMatchType(3))}
          />
        ) : (
          <SelectedOptionButton
            buttonText="3 대 3 미팅"
            onClick={() => dispatch(updateInputMatchType(0))}
          />
        )}
        {inputMatchInfo.matchType !== 4 ? (
          <OptionButton
            buttonText="4 대 4 미팅"
            onClick={() => dispatch(updateInputMatchType(4))}
          />
        ) : (
          <SelectedOptionButton
            buttonText="4 대 4 미팅"
            onClick={() => dispatch(updateInputMatchType(0))}
          />
        )}
      </div>
    </div>
  );
};

const WithFriendPage = (props) => {
  const { inputMatchInfo, dispatch } = props;
  return (
    <div className="MatchPage2">
      <div className="MatchTitle">
        <Title titleText={numPersonsPageTitleText} />
      </div>
      <div className="SelectNumPersons">
        {inputMatchInfo.numPersons !== 1 ? (
          <OptionButton
            buttonText="혼자 나가요"
            onClick={() => dispatch(updateInputNumPersons(1))}
          />
        ) : (
          <SelectedOptionButton
            buttonText="혼자 나가요"
            onClick={() => dispatch(updateInputNumPersons(0))}
          />
        )}
        {inputMatchInfo.numPersons !== 2 ? (
          <OptionButton
            buttonText="친구랑 같이 나가요"
            onClick={() => dispatch(updateInputNumPersons(2))}
          />
        ) : (
          <SelectedOptionButton
            buttonText="친구랑 같이 나가요"
            onClick={() => dispatch(updateInputNumPersons(0))}
          />
        )}
      </div>
    </div>
  );
};

const FriendUsernamePage = (props) => {
  const { currentUserInfo, inputMatchInfo, matchPageFriendUsername, dispatch } =
    props;
  const maxFriendNum = inputMatchInfo.matchType - 1;

  return (
    <div className="MatchPage3">
      <div className="MatchTitle">
        <Title titleText={friendUsernamePageTitleText} />
      </div>
      <div className="FriendUsernameGuideText">
        <p>
          {inputMatchInfo.matchType}대{inputMatchInfo.matchType} 미팅을
          선택하셨어요.
        </p>
        <p>최대 {maxFriendNum}명의 친구를 추가할 수 있어요</p>
      </div>
      <ChipsArray
        array={inputMatchInfo.friendUsernameData}
        onDelete={(chipToDelete) => () => {
          dispatch(deleteInputFriendUsernameData(chipToDelete.key));
        }}
      />
      <div className="InputFriendUsername">
        <div className="InputFriendUsernameTextField">
          <InputTextField
            error={
              matchPageFriendUsername.lengthError ||
              matchPageFriendUsername.inavailableError ||
              matchPageFriendUsername.notNewError ||
              matchPageFriendUsername.isUserError
            }
            onChange={(e) => {
              dispatch(updateMatchPageFriendUsername(e.target.value));
              dispatch(checkFriendUsernameRegex(e.target.value));
            }}
            value={matchPageFriendUsername.friendUsername}
            label="닉네임"
            helperText={matchPageFriendUsername.helperText}
          />
        </div>
        <AddButton
          isActivated={
            matchPageFriendUsername.friendUsername !== '' &&
            inputMatchInfo.friendUsernameData.length < maxFriendNum &&
            !matchPageFriendUsername.lengthError
          }
          onClick={async () => {
            const available = await checkFriendUsernameAvailable(
              matchPageFriendUsername.friendUsername
            );
            const newFriend = inputMatchInfo.friendUsernameData.every(
              (e) => e.label !== matchPageFriendUsername.friendUsername
            );
            const isUser =
              matchPageFriendUsername.friendUsername ===
              currentUserInfo.userInfo.username;
            if (!available) dispatch(friendUsernameAvailable(available));
            else if (!newFriend) dispatch(newFriendUsername(newFriend));
            else if (isUser) dispatch(isUserUsername(isUser));
            else {
              dispatch(resolveFriendUsernameErrors());
              dispatch(updateMatchPageFriendUsername(''));
              dispatch(
                updateInputFriendUsernameData(
                  matchPageFriendUsername.friendUsername
                )
              );
            }
          }}
        />
      </div>
    </div>
  );
};

const MatchConditionsPage = (props) => {
  const { matchConditions, dispatch } = props;
  return (
    <div className="MatchPage4">
      <div className="MatchTitle">
        <Title titleText={matchConditionsPageTitleText} />
      </div>
      <div className="InputMatchConditions">
        <div className="SelectUniversity">
          <p>
            대학 <span>선택</span>
          </p>
          <div className="SelectUniversityButtons">
            <SelectUniversityButton
              buttonText="서울대"
              isActivated={matchConditions.selectedUniversity.some(
                (e) => e === '서울대'
              )}
              onClick={() => dispatch(selectUniversity('서울대'))}
            />
            <SelectUniversityButton
              buttonText="연세대"
              isActivated={matchConditions.selectedUniversity.some(
                (e) => e === '연세대'
              )}
              onClick={() => dispatch(selectUniversity('연세대'))}
            />
            <SelectUniversityButton
              buttonText="고려대"
              isActivated={matchConditions.selectedUniversity.some(
                (e) => e === '고려대'
              )}
              onClick={() => dispatch(selectUniversity('고려대'))}
            />
          </div>
        </div>
        <div className="InputAgeRange">
          <p>
            나이 범위 <span>선택</span>
          </p>
          <InputRangeSlider
            onChange={(event, newAgeRange) => {
              dispatch(updateAgeRange(newAgeRange));
              dispatch(enableNavigationButton());
            }}
            ageRange={matchConditions.ageRange}
          />
        </div>
      </div>
    </div>
  );
};

const MatchNotifyPage = (props) => {
  return (
    <div className="MatchPage5">
      <div className="MatchTitle">
        <Title titleText={matchNotifyPageTitleText} />
      </div>
      <div className="MatchNotification">
        <p>이러쿵 저러쿵</p>
      </div>
    </div>
  );
};

export default Match;
