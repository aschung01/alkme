import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationButton,
  MatchNumPersonsButton,
  SelectUniversityButton,
  DisabledNavigationButton,
  SelectedMatchBumPersonsButton,
} from '../../components/buttons/buttons.js';
import { Header } from '../../components/header/header.js';
import { InputRangeSlider } from '../../components/sliders/sliders';
import { InputTextField } from '../../components/input_text_field/input_text_field.js';
import { Title } from '../../components/title/title.js';
import {
  jumpToPage,
  updateNumPersons,
  updateFriendUsername,
  friendUsernameAvailable,
  selectUniversity,
  updateAgeRange,
  enableNavigationButton,
  updateMatchUniversity,
  updateMatchInfoAgeRange,
  checkFriendUsernameRegex,
} from './matchSlice';
import './match.css';
import {
  checkFriendUsernameAvailable,
  updateUserMatchInfo,
} from '../../firebase/firebaseDb';

const numPersonsPageTitleText = '2대2 미팅에 함께\n 나갈 사람이 있나요?';
const friendUsernamePageTitleText = '함께 나갈 친구의\n 닉네임을 입력해주세요';
const matchConditionsPageTitleText =
  '희망하시는 미팅 상대의\n 대학, 나이를 알려주세요';
const matchNotifyPageTitleText = '마지막 단계에요!\n 안내사항을 읽어주세요';

function Match(props) {
  return (
    <div className="Match">
      <div className="Background1" />
      <div className="Background2" />
      {getHeader(props)}
      {getMatchPage(props)}
      <div className="NavigationButton">{getNavigationButton(props)}</div>
    </div>
  );
}

const getHeader = (props) => {
  const { matchPage, matchInfo, dispatch } = props;
  switch (matchPage) {
    case 1:
      return (
        <Header onClick={() => dispatch(jumpToPage(1))} backRoute="/home" />
      );
    case 2:
      return <Header onClick={() => dispatch(jumpToPage(matchPage - 1))} />;
    case 3:
      if (matchInfo.numPersons === 1)
        return <Header onClick={() => dispatch(jumpToPage(matchPage - 2))} />;
      else if (matchInfo.numPersons === 2)
        return <Header onClick={() => dispatch(jumpToPage(matchPage - 1))} />;
      break;
    default:
      return <Header onClick={() => dispatch(jumpToPage(matchPage - 1))} />;
  }
};

const getMatchPage = (props) => {
  const {
    matchPage,
    matchPageFriendUsername,
    matchConditions,
    matchInfo,
    dispatch,
  } = props;
  switch (matchPage) {
    case 1:
      return <NumPersonsPage matchInfo={matchInfo} dispatch={dispatch} />;
    case 2:
      return (
        <FriendUsernamePage
          matchPageFriendUsername={matchPageFriendUsername}
          matchInfo={matchInfo}
          dispatch={dispatch}
        />
      );
    case 3:
      return (
        <MatchConditionsPage
          matchInfo={matchInfo}
          matchConditions={matchConditions}
          dispatch={dispatch}
        />
      );
    case 4:
      return <MatchNotifyPage matchInfo={matchInfo} dispatch={dispatch} />;
    default:
      return <NumPersonsPage matchInfo={matchInfo} dispatch={dispatch} />;
  }
};

const getNavigationButton = (props) => {
  const {
    matchPage,
    matchPageFriendUsername,
    matchConditions,
    matchInfo,
    dispatch,
  } = props;
  switch (matchPage) {
    case 1:
      if (matchInfo.numPersons === 0)
        return <DisabledNavigationButton buttonText="다음" />;
      else
        return (
          <NavigationButton
            buttonText="다음"
            onClick={() => {
              if (matchInfo.numPersons === 2)
                dispatch(jumpToPage(matchPage + 1));
              else if (matchInfo.numPersons === 1)
                dispatch(jumpToPage(matchPage + 2));
            }}
          />
        );
    case 2:
      if (
        matchInfo.friendUsername === '' ||
        matchPageFriendUsername.lengthError
      )
        return <DisabledNavigationButton buttonText="다음" />;
      else if (matchPageFriendUsername.inavailableError)
        return (
          <NavigationButton
            buttonText="닉네임 확인"
            onClick={async () => {
              const available = await checkFriendUsernameAvailable(
                matchInfo.friendUsername
              );
              dispatch(friendUsernameAvailable(available));
            }}
          />
        );
      else
        return (
          <NavigationButton
            buttonText="다음"
            onClick={async () => {
              const available = await checkFriendUsernameAvailable(
                matchInfo.friendUsername
              );
              if (!available) dispatch(friendUsernameAvailable(available));
              else dispatch(jumpToPage(matchPage + 1));
            }}
          />
        );
    case 3:
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
                updateMatchUniversity(matchConditions.selectedUniversity)
              );
              dispatch(updateMatchInfoAgeRange(matchConditions.ageRange));
            }}
          />
        );

    case 4:
      return (
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <NavigationButton
            buttonText="등록하기"
            onClick={() => {
              dispatch(jumpToPage(1));
              updateUserMatchInfo(matchInfo);
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

const NumPersonsPage = (props) => {
  const { matchInfo, dispatch } = props;
  return (
    <div className="Page1">
      <div className="Title">
        <Title titleText={numPersonsPageTitleText} />
      </div>

      <div className="SelectNumPersons">
        {matchInfo.numPersons !== 1 ? (
          <MatchNumPersonsButton
            buttonText="혼자 나가요"
            onClick={() => dispatch(updateNumPersons(1))}
          />
        ) : (
          <SelectedMatchBumPersonsButton
            buttonText="혼자 나가요"
            onClick={() => dispatch(updateNumPersons(0))}
          />
        )}
        {matchInfo.numPersons !== 2 ? (
          <MatchNumPersonsButton
            buttonText="친구랑 같이 나가요"
            onClick={() => dispatch(updateNumPersons(2))}
          />
        ) : (
          <SelectedMatchBumPersonsButton
            buttonText="친구랑 같이 나가요"
            onClick={() => dispatch(updateNumPersons(0))}
          />
        )}
      </div>
    </div>
  );
};

const FriendUsernamePage = (props) => {
  const { matchPageFriendUsername, dispatch } = props;
  return (
    <div className="Page2">
      <div className="Title">
        <Title titleText={friendUsernamePageTitleText} />
      </div>
      <div className="InputFriendUsername">
        <InputTextField
          error={
            matchPageFriendUsername.lengthError ||
            matchPageFriendUsername.inavailableError
          }
          onChange={(e) => {
            dispatch(updateFriendUsername(e.target.value));
            dispatch(checkFriendUsernameRegex(e.target.value));
          }}
          label="닉네임"
          helperText={matchPageFriendUsername.helperText}
        />
      </div>
    </div>
  );
};

const MatchConditionsPage = (props) => {
  const { matchConditions, dispatch } = props;
  return (
    <div className="Page3">
      <div className="Title">
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
    <div className="Page4">
      <div className="Title">
        <Title titleText={matchNotifyPageTitleText} />
      </div>
      <div className="MatchNotification">
        <p>이러쿵 저러쿵</p>
      </div>
    </div>
  );
};

export default Match;
