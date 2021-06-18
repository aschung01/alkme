import React from 'react';
import { Link } from 'react-router-dom';
import { RouteButton } from '../../components/buttons/buttons.js';
import { HomeHeader } from '../../components/header/header.js';
import './home.css';
import { logout } from '../../firebase/firebaseAuth';

export const Home = (props) => {
  const { currentUserInfo, dispatch } = props;
  const homeTitleText = `${currentUserInfo.userInfo.username}님 환영합니다!`;

  const logoutClick = (e) => {
    logout();
  };

  return (
    <div className="Home">
      <span className="Dot1" />
      <span className="Dot2" />
      <span className="Dot3" />
      <span className="Dot4" />
      <div className="HomeView">
        <div className="HomeHeader">
          <HomeHeader
            titleText={homeTitleText}
            logoutClick={logoutClick}
            dispatch={dispatch}
          />
        </div>
        <div className="Routes">
          <Link to="/about" className="AboutServiceButton">
            <RouteButton buttonText="서비스 이용방법" />
          </Link>
          <Link to="/match" className="MatchStartButton">
            <RouteButton buttonText="미팅 신청하기" />
          </Link>
          <Link to="/match_results" className="MatchResultsButton">
            <RouteButton buttonText="매칭 결과 확인하기" />
          </Link>
        </div>
      </div>
    </div>
  );
};
