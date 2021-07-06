import React, { useCallback, useEffect } from 'react';
import { BackgroundDots } from '../../components/background_dots/background_dots';
import { CircularProgressIndicator } from '../../components/progress_indicator/progress_indicator';
import { Header } from '../../components/header/header';
import { getCurrentMatchListFromDb } from '../../firebase/firebaseDb';
import {
  updateCurrentMatchList,
  updateCurrentMeetingsLoading,
} from './display_current_meetings_Slice';
import './display_current_meetings.css';

export const DisplayCurrentMeetings = (props) => {
  const { displayCurrentMeetings, dispatch } = props;
  return (
    <div className="DisplayCurrentMeetings">
      <BackgroundDots />
      <div className="DisplayCurrentMeetingsHeader">
        <Header backRoute="/home" titleText="매칭된 미팅" />
      </div>
      <div className="DisplayCurrentMeetingsContent">
        <div className="CurrentMeetingsListWrapper">
          <CurrentMeetingsList
            matchType={2}
            displayCurrentMeetings={displayCurrentMeetings}
            dispatch={dispatch}
          />
          <CurrentMeetingsList
            matchType={3}
            displayCurrentMeetings={displayCurrentMeetings}
            dispatch={dispatch}
          />
          <CurrentMeetingsList
            matchType={4}
            displayCurrentMeetings={displayCurrentMeetings}
            dispatch={dispatch}
          />
        </div>
      </div>
    </div>
  );
};

const CurrentMeetingsList = (props) => {
  const { matchType, displayCurrentMeetings, dispatch } = props;

  const fetchMatchList = useCallback(() => {
    let mounted = true;
    const getCurrentMatchList = async () => {
      const list = await getCurrentMatchListFromDb();
      if (mounted) {
        dispatch(updateCurrentMatchList(list));
        dispatch(updateCurrentMeetingsLoading(false));
      }
    };
    getCurrentMatchList();
    return function cleanup() {
      mounted = true;
    };
  }, [dispatch]);

  useEffect(() => fetchMatchList(), [fetchMatchList]);

  if (displayCurrentMeetings.loading)
    return (
      <div className="CurrentMeetingsList">
        <CircularProgressIndicator />
      </div>
    );
  else
    return (
      <div className="CurrentMeetingsList">
        <span className="CurrentMeetingsListLabel">
          {matchType}대{matchType} 미팅
        </span>
        {displayCurrentMeetings.currentMatchList[matchType - 2].map(
          (matchData, index) => {
            return (
              <div className="CurrentMeetingsListItem" key={index}>
                <div className="CurrentMeetingsData">
                  <span>남성: </span>
                  <ul className="CurrentMeetingsDataUsersList">
                    {matchData.users
                      .filter((user) => user.gender === '남성')
                      .map((user) => (
                        <li key={user.uid} className="CurrentMeetingsDataUser">
                          {user.username}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="CurrentMeetingsData">
                  <span>여성: </span>
                  <ul className="CurrentMeetingsDataUsersList">
                    {matchData.users
                      .filter((user) => user.gender === '여성')
                      .map((user) => (
                        <li key={user.uid} className="CurrentMeetingsDataUser">
                          {user.username}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="CurrentMeetingsData">
                  <span>날짜: </span>
                  <ul className="CurrentMeetingsDataDateList">
                    {matchData.dates.map((date, index) => (
                      <li key={index} className="CurrentMeetingsDataDate">
                        {date}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          }
        )}
      </div>
    );
};
