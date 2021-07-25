import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SuccessAlert } from '../../components/alerts/alerts';
import { RouteButton } from '../../components/buttons/buttons.js';
import { HomeHeader } from '../../components/header/header.js';
import './home.css';
import { logout } from '../../firebase/firebaseAuth';
import { checkUserMatchEnrollAvailable } from '../../firebase/firebaseDb.js';
import { toggleUserMatchEnrollAlert } from './homeSlice.js';
import { AlertDialog } from '../../components/dialogs/dialogs.js';
import { BackgroundDots } from '../../components/background_dots/background_dots.js';

export const Home = (props) => {
  const { currentUserInfo, homePage, dispatch } = props;
  const homeTitleText = `${currentUserInfo.userInfo.username}님 환영합니다!`;
  const matchEnrollAlertTitle = '현재 매칭 대기중인 미팅이 있습니다';
  const matchEnrollAlertContent =
    '정확한 서비스를 제공하기 위해, 신청된 미팅의 매칭이 완료되기 전에는 신규 미팅의 신청을 제한하고 있습니다.\n매칭 대기중인 미팅 정보를 보기 위해서는 <내 정보> 페이지를 확인해 주세요';
  const history = useHistory();

  const logoutClick = (e) => {
    logout();
  };

  return (
    <div className="Home">
      <BackgroundDots />
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
          <div className="MatchStartButton">
            <RouteButton
              buttonText="미팅 신청하기"
              onClick={async () => {
                const enrollAvailable = await checkUserMatchEnrollAvailable();
                if (!enrollAvailable) dispatch(toggleUserMatchEnrollAlert());
                else history.push('/match');
              }}
            />
          </div>
          <Link to="/match_results" className="MatchResultsButton">
            <RouteButton buttonText="매칭 결과 확인하기" />
          </Link>
        </div>
        <div className="HomeMatchEnrollAlert">
          <AlertDialog
            title={matchEnrollAlertTitle}
            content={matchEnrollAlertContent}
            open={homePage.matchEnrollAlert}
            onClose={() => dispatch(toggleUserMatchEnrollAlert())}
          />
        </div>
        <div className="HomeMatchEnrollSuccessAlert">
          <SuccessAlert
            open={homePage.matchEnrollSuccessAlert}
            text="미팅 신청이 완료되었습니다!"
          />
        </div>
      </div>
    </div>
  );
};
