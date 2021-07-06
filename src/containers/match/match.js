import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { LabeledCheckbox } from '../../components/labeled_checkbox/labeled_checkbox';
import { MultipleDatePicker } from '../../components/multiple_date_picker/multiple_date_picker';
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
  updateInputAvailableDates,
  checkFriendUsernameRegex,
  resetInputMatchInfo,
  newFriendUsername,
  doesFriendGenderMatch,
  isUserUsername,
  resolveFriendUsernameErrors,
  toggleSelectAllUniversities,
  isMatchEnrollAvailable,
  triggerMatchEnrollWarningAlert,
  isFriendEnrollAvailable,
  toggleFriendEnrollWarningAlert,
  resetInputMatchConditions,
  resetMatchPageFriendUsername,
} from './matchSlice';
import './match.css';
import {
  checkFriendGenderMatch,
  checkFriendUsernameAvailable,
  getMatchEnrollAvailableList,
  getEnrollUsersValue,
  updateDbEnrolledMatchLists,
  checkFriendEnrollAvailable,
} from '../../firebase/firebaseDb';
import { ChipsArray } from '../../components/chips_array/chips_array.js';
import { WarningAlert } from '../../components/alerts/alerts.js';
import { AlertDialog } from '../../components/dialogs/dialogs.js';

const matchTypePageTitleText = '나가려는 미팅의\n종류를 선택해주세요';
const numPersonsPageTitleText = '미팅에 함께\n나갈 사람이 있나요?';
const friendUsernamePageTitleText = '함께 나갈 친구의\n닉네임을 입력해주세요';
const matchConditionsPageTitleText =
  '희망하시는 미팅 상대의\n 대학, 나이를 알려주세요';
const matchAvailableDatesPageTitleText =
  '희망하시는 미팅 날짜를 모두 선택해주세요';
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
      <MatchPageTitle matchPage={matchPage} />
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
  switch (matchPage.page) {
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
      return (
        <Header onClick={() => dispatch(jumpToPage(matchPage.page - 1))} />
      );
    case 3:
      if (inputMatchInfo.numPersons === 1)
        return (
          <Header onClick={() => dispatch(jumpToPage(matchPage.page - 2))} />
        );
      else if (inputMatchInfo.numPersons === 2)
        return (
          <Header onClick={() => dispatch(jumpToPage(matchPage.page - 1))} />
        );
      break;
    default:
      return (
        <Header onClick={() => dispatch(jumpToPage(matchPage.page - 1))} />
      );
  }
};

const MatchPageTitle = (props) => {
  const { matchPage } = props;
  switch (matchPage.page) {
    case 1:
      return (
        <div className="MatchTitle">
          <Title titleText={matchTypePageTitleText} />
        </div>
      );
    case 2:
      return (
        <div className="MatchTitle">
          <Title titleText={numPersonsPageTitleText} />
        </div>
      );
    case 3:
      return (
        <div className="MatchTitle">
          <Title titleText={friendUsernamePageTitleText} />
        </div>
      );
    case 4:
      return (
        <div className="MatchTitle">
          <Title titleText={matchConditionsPageTitleText} />
        </div>
      );
    case 5:
      return (
        <div className="MatchTitle">
          <Title titleText={matchAvailableDatesPageTitleText} />
        </div>
      );
    case 6:
      return (
        <div className="MatchTitle">
          <Title titleText={matchNotifyPageTitleText} />
        </div>
      );
    default:
      return (
        <div className="MatchTitle">
          <Title titleText={matchTypePageTitleText} />
        </div>
      );
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
  switch (matchPage.page) {
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
        <MatchAvailableDatesPage
          inputMatchInfo={inputMatchInfo}
          dispatch={dispatch}
        />
      );
    case 6:
      return (
        <MatchNotifyPage
          matchPage={matchPage}
          inputMatchInfo={inputMatchInfo}
          dispatch={dispatch}
        />
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
  const history = useHistory();

  switch (matchPage.page) {
    case 1:
      if (inputMatchInfo.matchType === 0)
        return <DisabledNavigationButton buttonText="다음" />;
      else
        return (
          <NavigationButton
            buttonText="다음"
            onClick={() => dispatch(jumpToPage(matchPage.page + 1))}
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
                dispatch(jumpToPage(matchPage.page + 1));
              else if (inputMatchInfo.numPersons === 1)
                dispatch(jumpToPage(matchPage.page + 2));
            }}
          />
        );
    case 3:
      if (
        inputMatchInfo.friendUsernameData.length !==
        inputMatchInfo.matchType - 1
      )
        return <DisabledNavigationButton buttonText="다음" />;
      else
        return (
          <NavigationButton
            buttonText="다음"
            onClick={() => {
              dispatch(jumpToPage(matchPage.page + 1));
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
              dispatch(jumpToPage(matchPage.page + 1));
              dispatch(
                updateInputMatchUniversities(matchConditions.selectedUniversity)
              );
              dispatch(updateInputMatchInfoAgeRange(matchConditions.ageRange));
            }}
          />
        );
    case 5:
      if (inputMatchInfo.availableDates.length === 0)
        return <DisabledNavigationButton buttonText="다음" />;
      else
        return (
          <NavigationButton
            buttonText="다음"
            onClick={() => {
              dispatch(jumpToPage(matchPage.page + 1));
            }}
          />
        );
    case 6:
      return (
        <NavigationButton
          buttonText="등록하기"
          onClick={async () => {
            const usersValue = await getEnrollUsersValue(
              currentUserInfo.userInfo,
              inputMatchInfo
            );
            const usersEnrollAvailableList = await getMatchEnrollAvailableList(
              usersValue
            );
            const enrollAvailable = usersEnrollAvailableList.every(
              (val) => val === true
            );
            if (enrollAvailable) {
              history.push('/home');
              dispatch(jumpToPage(1));
              updateDbEnrolledMatchLists(
                usersValue,
                currentUserInfo.userInfo,
                inputMatchInfo
              );
              dispatch(resetMatchPageFriendUsername());
              dispatch(resetInputMatchConditions());
              dispatch(resetInputMatchInfo());
            } else {
              dispatch(isMatchEnrollAvailable(enrollAvailable));
              dispatch(triggerMatchEnrollWarningAlert());
              setTimeout(() => {
                dispatch(triggerMatchEnrollWarningAlert());
              }, 2000);
            }
          }}
        />
      );
    default:
      return (
        <NavigationButton
          buttonText="다음"
          onClick={() => dispatch(jumpToPage(matchPage.page + 1))}
        />
      );
  }
};

const MatchTypePage = (props) => {
  const { inputMatchInfo, dispatch } = props;

  return (
    <div className="MatchPage1">
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
  const [warning, setWarning] = useState(false);
  return (
    <div className="MatchPage2">
      <div className="SelectNumPersons">
        {
          //inputMatchInfo.numPersons !== 1 ? (
          <OptionButton
            buttonText="혼자 나가요"
            onClick={() => {
              setWarning(true);
              setTimeout(() => {
                setWarning(false);
              }, 5000);
              // dispatch(updateInputNumPersons(1));
            }}
          />
          // )
          // : (
          //   <SelectedOptionButton
          //     buttonText="혼자 나가요"
          //     onClick={() => dispatch(updateInputNumPersons(0))}
          //   />
          // )
        }
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
      <AlertDialog
        open={warning}
        onClose={() => setWarning(false)}
        title="앗! 현재 개발 중인 기능입니다"
        content="지금은 미팅을 신청하려면 함께 나갈 인원(동일 성별)을 모두 구하셔야 해요. 빠른 시일 내로 업데이트로 찾아뵐게요!"
      />
    </div>
  );
};

const FriendUsernamePage = (props) => {
  const { currentUserInfo, inputMatchInfo, matchPageFriendUsername, dispatch } =
    props;
  const maxFriendNum = inputMatchInfo.matchType - 1;

  return (
    <div className="MatchPage3">
      <div className="FriendUsernameGuideText">
        <p>
          {inputMatchInfo.matchType}대{inputMatchInfo.matchType} 미팅을
          선택하셨어요.
        </p>
        <p>함께 나갈 {maxFriendNum}명의 친구를 추가해 주세요</p>
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
              matchPageFriendUsername.genderError ||
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
            if (!available) dispatch(friendUsernameAvailable(available));
            else {
              const newFriend = inputMatchInfo.friendUsernameData.every(
                (e) => e.label !== matchPageFriendUsername.friendUsername
              );
              const friendGenderMatch = await checkFriendGenderMatch(
                matchPageFriendUsername.friendUsername,
                currentUserInfo.userInfo.gender
              );
              const isUser =
                matchPageFriendUsername.friendUsername ===
                currentUserInfo.userInfo.username;
              const friendEnrollAvailable = await checkFriendEnrollAvailable(
                matchPageFriendUsername.friendUsername
              );
              if (!newFriend) dispatch(newFriendUsername(newFriend));
              else if (!friendGenderMatch)
                dispatch(doesFriendGenderMatch(friendGenderMatch));
              else if (isUser) dispatch(isUserUsername(isUser));
              else if (!friendEnrollAvailable) {
                dispatch(isFriendEnrollAvailable(friendEnrollAvailable));
                dispatch(toggleFriendEnrollWarningAlert());
                setTimeout(() => {
                  dispatch(toggleFriendEnrollWarningAlert());
                }, 2000);
              } else {
                dispatch(resolveFriendUsernameErrors());
                dispatch(updateMatchPageFriendUsername(''));
                dispatch(
                  updateInputFriendUsernameData(
                    matchPageFriendUsername.friendUsername
                  )
                );
              }
            }
          }}
        />
      </div>
      <div className="FriendEnrollWarningAlert">
        <WarningAlert
          open={matchPageFriendUsername.warningAlert}
          alertText={`${matchPageFriendUsername.friendUsername}님은 현재 매칭 대기중인 미팅이 있습니다!`}
        />
      </div>
    </div>
  );
};

const MatchConditionsPage = (props) => {
  const { matchConditions, dispatch } = props;
  return (
    <div className="MatchPage4">
      <div className="InputMatchConditions">
        <div className="SelectUniversity">
          <div className="SelectUniversityHeader">
            <p>
              대학 <span>선택</span>
            </p>
            <LabeledCheckbox
              label="모두 선택"
              onChange={() => dispatch(toggleSelectAllUniversities())}
              checked={matchConditions.unselectedUniversity.length === 0}
            />
          </div>

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

const MatchAvailableDatesPage = (props) => {
  const { inputMatchInfo, dispatch } = props;
  return (
    <div className="MatchPage5">
      <p className="AvailableDatesGuideText">
        현재 날짜로부터 2주 이내로만 선택해주세요. 미팅이 매칭된 이후에는 날짜
        변경이 불가합니다
      </p>
      <div className="MultipleDatePicker">
        <MultipleDatePicker
          values={inputMatchInfo.availableDates}
          onChange={(array) => {
            const availableDates = array.map((dateObject) =>
              dateObject.format('YYYY/MM/DD/ddd')
            );
            dispatch(updateInputAvailableDates(availableDates));
          }}
        />
      </div>
    </div>
  );
};

const MatchNotifyPage = (props) => {
  const { matchPage } = props;

  return (
    <div className="MatchPage6">
      <div className="MatchNotification">
        <p>이러쿵 저러쿵</p>
      </div>
      <div className="MatchEnrollWarningAlert">
        <WarningAlert
          open={matchPage.warningAlert}
          alertText="현재 매칭 대기중인 미팅이 있습니다!"
        />
      </div>
    </div>
  );
};

export default Match;
