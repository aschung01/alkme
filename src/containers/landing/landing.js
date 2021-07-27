import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated as a } from 'react-spring';
import {
  ActionButton,
  RegisterOrLoginButton,
  TextButton,
} from '../../components/buttons/buttons.js';
import mainLogo from '../../assets/Alkme logo RemovedBg.png';
import logoText from '../../assets/alkme logo text removedBg 2.png';
import './landing.css';
import { jumpToPage, toggleDisplayInfo } from './landingSlice.js';

export const Landing = (props) => {
  const { landing, dispatch } = props;

  const mainLandingProps = useSpring({
    height: !landing.displayInfo ? '65vh' : '0vh',
    top: !landing.displayInfo ? '0vh' : '-20vh',
  });

  const logoSectionProps = useSpring({
    height: !landing.displayInfo ? '65vh' : '0vh',
  });

  const aboutAlkmeButtonProps = useSpring({
    bottom: !landing.displayInfo ? '1vh' : '-20vh',
  });

  const alkmeInfoProps = useSpring({
    top: landing.displayInfo ? '2vh' : '-10vh',
  });

  const landingStartButtonProps = useSpring({
    bottom: landing.displayInfo ? '1vh' : '-20vh',
  });

  return (
    <div className="Landing">
      <a.div className="MainLanding" style={mainLandingProps}>
        <a.div className="LogoSection" style={logoSectionProps}>
          <img
            src={mainLogo}
            alt="logo"
            style={{ width: '130px', margin: '30px 0 10px' }}
          />
          <img
            src={logoText}
            alt="alkme"
            style={{ width: '250px', margin: '10px' }}
          />
          <p className="Version">
            beta
            <br />
            0.1.0
          </p>
          <p className="LandingHeader">알송달송 K 미팅</p>
        </a.div>
        <div className="RegisterOrLogin">
          <Link to="/register" className="RegisterButton">
            <RegisterOrLoginButton buttonText="회원가입" />
          </Link>
          <Link to="/login" className="LoginTextButton">
            <TextButton buttonText="로그인" color="black" />
          </Link>
        </div>
      </a.div>
      <a.div className="AboutAlkme" style={aboutAlkmeButtonProps}>
        <TextButton
          buttonText="about"
          style={{ color: '#E4515F', fontSize: '17px' }}
          onClick={() => dispatch(toggleDisplayInfo())}
        />
      </a.div>
      <a.div className="AlkmeInfo" style={alkmeInfoProps}>
        <div className="AlkmeInfoHeader">
          <span style={{ paddingBottom: '10px' }}>미래에서 온 미팅이라고?</span>
          <span>온라인과 오프라인 데이팅의 만남,</span>
          <span>alkme.</span>
        </div>
        <p className="AlkmeInfoText">
          alkme (알송달송 K 미팅) 는 과 친구의 말을 듣고 서울대 재학생이 만든
          오프라인 미팅 매칭 서비스에서 출발해, 온라인 컨텐츠를 중심으로 데이팅
          메타버스로 성장중입니다.
          <br />
          <br />
          <span style={{ color: '#EF515F', fontSize: '17px' }}>
            1분이면 미팅 날짜까지 확정된다구요?
          </span>
          <br />
          <br />더 이상 친구들에게 미팅을 잡아달라고 하거나, 과 단톡방에 올라온
          미팅이 순식간에 마감되어 아쉬워할 필요 없습니다. 가능한 날짜, 희망하는
          상대의 나이와 대학 등만 적어서 신청하면 끝! 조건이 맞는 상대가
          나타나면 바로 매칭이 완료됩니다.
        </p>
      </a.div>
      <a.div className="LandingStartButton" style={landingStartButtonProps}>
        <ActionButton
          buttonText="시작하기"
          onClick={() => dispatch(toggleDisplayInfo())}
        />
      </a.div>
    </div>
  );
};
