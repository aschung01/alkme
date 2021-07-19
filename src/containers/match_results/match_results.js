import React, { useCallback, useEffect } from 'react';
import { BackgroundDots } from '../../components/background_dots/background_dots';
import { Header } from '../../components/header/header';
import { getUserMatchResultsFromDb } from '../../firebase/firebaseDb';
import {
  updateMatchResults,
  updateMatchResultsLoading,
} from './match_results_Slice';
import './match_results.css';
import { CircularProgressIndicator } from '../../components/progress_indicator/progress_indicator';

export const MatchResults = (props) => {
  const { matchResults, dispatch } = props;
  return (
    <div className="MatchResults">
      <BackgroundDots />
      <div className="MatchResultsHeader">
        <Header backRoute="/home" titleText="매칭 결과 확인하기" />
      </div>
      <div className="MatchResultsContent">
        <MatchResultBox matchResults={matchResults} dispatch={dispatch} />
      </div>
    </div>
  );
};

const MatchResultBox = (props) => {
  const { matchResults, dispatch } = props;

  const fetchMatchList = useCallback(() => {
    let mounted = true;
    const getMatchResults = async () => {
      const list = await getUserMatchResultsFromDb();
      if (mounted) {
        dispatch(updateMatchResults(list));
        dispatch(updateMatchResultsLoading(false));
      }
    };
    getMatchResults();
    return function cleanup() {
      mounted = false;
    };
  }, [dispatch]);

  useEffect(() => fetchMatchList(), [fetchMatchList]);
  if (matchResults.loading) return <CircularProgressIndicator />;
  else if (matchResults.matchResults.length > 0)
    return (
      <div className="MatchResultBox">
        <div className="MatchResultBoxLabel"></div>
        <div className="MatchResultBoxData">
          <span>날짜: {matchResults.matchResults[0].date}</span>
          <br />
          <span>남자: </span>
          <ul className="MatchResultBoxDataUsersList">
            {matchResults.matchResults[0].users
              .filter((user) => user.gender === '남성')
              .map((user) => (
                <li className="MatchResultBoxDataUser" key={user.uid}>
                  {user.username}
                </li>
              ))}
          </ul>
          <span>여자: </span>
          <ul className="MatchResultBoxDataUsersList">
            {matchResults.matchResults[0].users
              .filter((user) => user.gender === '여성')
              .map((user) => (
                <li className="MatchResultBoxDataUser" key={user.uid}>
                  {user.username}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  else
    return (
      <div className="MatchResultBox">
        <div className="MatchResultBoxLabel"></div>
        <div className="MatchResultBoxData">
          <span>매칭된 미팅이 없습니다</span>
        </div>
      </div>
    );
};
