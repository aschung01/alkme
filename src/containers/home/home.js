import React from 'react';
import { Link } from 'react-router-dom';
import { RouteButton } from '../../components/buttons/buttons.js';
import { Title } from '../../components/title/title';
import './home.css';
import { currentUsername } from '../../firebase/firebaseAuth';

function Home() {
  return (
    <div className="Home">
      <span className="Dot1" />
      <span className="Dot2" />
      <span className="Dot3" />
      <span className="Dot4" />
      <div className="HomeTitle">{getHomeTitle()}</div>
      <div className="Routes">
        <Link to="/terms_of_use" className="AboutServiceButton">
          <RouteButton background="#FBD0CAE5" buttonText="서비스 이용방법" />
        </Link>
        <Link to="/match" className="MatchStartButton">
          <RouteButton background="#f4838aE5" buttonText="시작하기" />
        </Link>
        <Link to="/match_results" className="MatchResultsButton">
          <RouteButton background="#ef515fE5" buttonText="매칭 결과 확인하기" />
        </Link>
      </div>
    </div>
  );
}

const getHomeTitle = () => {
   const username = currentUsername();
  const homeTitleText = `${username}님 환영합니다!`;
  return <Title titleText={homeTitleText} />;
};

export default Home;
