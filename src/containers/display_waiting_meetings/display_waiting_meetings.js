import React, { useCallback, useEffect } from 'react';
import { BackgroundDots } from '../../components/background_dots/background_dots';
import { ActionButton } from '../../components/buttons/buttons';
import { CircularProgressIndicator } from '../../components/progress_indicator/progress_indicator';
import { Header } from '../../components/header/header';
import {
  updateEnrolledMatchList,
  updateWaitingMeetingsLoading,
} from './display_waiting_meetings_Slice';
import {
  getEnrolledMatchListFromDb,
  matchEnrolledMatchListDb,
} from '../../firebase/firebaseDb';
import './display_waiting_meetings.css';

export const DisplayWaitingMeetings = (props) => {
  const { displayWaitingMeetings, dispatch } = props;
  return (
    <div className="DisplayWaitingMeetings">
      <BackgroundDots />
      <div className="DisplayWaitingMeetingsHeader">
        <Header backRoute="/home" titleText="대기중인 미팅" />
      </div>
      <div className="DisplayWaitingMeetingsContent">
        <div className="WaitingMeetingsListWrapper">
          <EnrolledMatchList
            gender="남성"
            displayWaitingMeetings={displayWaitingMeetings}
            dispatch={dispatch}
          />
          <EnrolledMatchList
            gender="여성"
            displayWaitingMeetings={displayWaitingMeetings}
            dispatch={dispatch}
          />
        </div>
        <div className="MatchActionButton">
          <ActionButton
            buttonText="매칭하기"
            onClick={() =>
              matchEnrolledMatchListDb(displayWaitingMeetings.enrolledMatchList)
            }
          />
        </div>
      </div>
    </div>
  );
};

const EnrolledMatchList = (props) => {
  const { displayWaitingMeetings, gender, dispatch } = props;
  const genderType = gender === '남성' ? 0 : 1;
  const fetchMatchList = useCallback(() => {
    let mounted = true;
    const getEnrolledMatchList = async () => {
      const list = await getEnrolledMatchListFromDb();
      if (mounted) {
        dispatch(updateEnrolledMatchList(list));
        dispatch(updateWaitingMeetingsLoading(false));
      }
    };
    getEnrolledMatchList();
    return function cleanup() {
      mounted = false;
    };
  }, [dispatch]);

  useEffect(() => fetchMatchList(), [fetchMatchList]);
  
  if (displayWaitingMeetings.loading) return <CircularProgressIndicator />;
  else
    return (
      <div className="WaitingMeetingsList">
        <span className="WaitingMeetingsListLabel">{gender}</span>
        {displayWaitingMeetings.enrolledMatchList[genderType].map(
          (matchData, index) => {
            return (
              <div className="WaitingMeetingsListItem" key={index}>
                <span style={{ marginLeft: '3px' }}>
                  {matchData.matchType}인, {gender}:
                </span>
                <ul className="WaitingMeetingsDataUsersList">
                  {matchData.users.map((user) => (
                    <li key={user.uid} className="WaitingMeetingsDataUser">
                      {user.username}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        )}
      </div>
    );
};
