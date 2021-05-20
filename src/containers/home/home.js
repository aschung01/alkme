import React from 'react';
import { Link } from 'react-router-dom';
import { RouteButton } from '../../components/buttons/buttons.js';
import './home.css';

export const Home = (props) => {
  const {currentUserInfo} = props;
  const homeTitleText = `${currentUserInfo.userInfo.username}님 환영합니다!`;

  return (
    <div className="Home">
      <span className="Dot1" />
      <span className="Dot2" />
      <span className="Dot3" />
      <span className="Dot4" />
      <div className="HomeTitle" style={{height:'10vh', display: 'flex', alignContent: 'center'}}><span style={{fontSize: '20px', fontWeight: 'bold', margin: 'auto'}}>{homeTitleText}</span></div>
      <div className="Routes">
        <Link to="/terms_of_use" className="AboutServiceButton">
          <RouteButton background="#FBD0CAE5" buttonText="서비스 이용방법" />
        </Link>
        <Link to="/match" className="MatchStartButton">
          <RouteButton background="#f4838aE5" buttonText="미팅 신청하기" />
        </Link>
        <Link to="/match_results" className="MatchResultsButton">
          <RouteButton background="#ef515fE5" buttonText="매칭 결과 확인하기" />
        </Link>
      </div>
    </div>
  );
}
