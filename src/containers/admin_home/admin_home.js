import React from 'react';
import { Link } from 'react-router-dom';
import { RouteButton } from '../../components/buttons/buttons.js';
import { AdminHomeHeader } from '../../components/header/header.js';
import './admin_home.css';
import { logout } from '../../firebase/firebaseAuth';
import { BackgroundDots } from '../../components/background_dots/background_dots.js';

export const AdminHome = (props) => {
  const { currentUserInfo } = props;
  const homeTitleText = `${currentUserInfo.userInfo.username}님[관리자] 환영합니다!`;

  const logoutClick = (e) => {
    logout();
  };

  return (
    <div className="AdminHome">
      <BackgroundDots />
      <div className="AdminHomeView">
        <div className="AdminHomeHeader">
          <AdminHomeHeader
            titleText={homeTitleText}
            logoutClick={logoutClick}
          />
        </div>
        <div className="AdminRoutes">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '10px 10vw',
            }}
          >
            <Link to="/display_users_info" className="TopRouteButtonLink">
              <RouteButton width="38vw" buttonText="사용자 정보" />
            </Link>
            <Link to="/display_feedback" className="TopRouteButtonLink">
              <RouteButton width="38vw" buttonText="피드백 확인" />
            </Link>
          </div>
          <Link to="/display_current_meetings" className="RouteButtonLink">
            <RouteButton buttonText="매칭된 미팅" />
          </Link>
          <Link to="/display_previous_meetings" className="RouteButtonLink">
            <RouteButton buttonText="완료된 미팅" />
          </Link>
          <Link to="/display_waiting_meetings" className="RouteButtonLink">
            <RouteButton buttonText="대기중인 미팅" background="linear-gradient(to right bottom, rgba(255, 250, 238, 0.8), rgba(239, 81, 95, 0.8))"/>
          </Link>
        </div>
      </div>
    </div>
  );
};
