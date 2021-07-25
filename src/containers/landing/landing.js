import React from 'react';
import { Link } from 'react-router-dom';
import {
  RegisterOrLoginButton,
  TextButton,
} from '../../components/buttons/buttons.js';
import mainLogo from '../../assets/Alkme logo RemovedBg.png';
import logoText from '../../assets/Alkme logo text RemovedBg.png';
import './landing.css';

export const Landing = () => {
  return (
    <div className="Landing">
      <div className="LogoSection">
        <img src={mainLogo} alt="logo" style={{width: '130px', margin: '30px 0 10px'}}/>
        <img src={logoText} alt="alkme" style={{width: '250px', margin: '10px'}}/>
        <p className="Version">beta<br/>0.1.0</p>
        <p className="LandingHeader">알송달송 K 미팅</p>
      </div>
      <div className="RegisterOrLogin">
          <Link to="/register" className="RegisterButton">
            <RegisterOrLoginButton buttonText="회원가입" />
          </Link>
          <Link to="/login" className="LoginTextButton">
            <TextButton buttonText="로그인" color="black"/>
          </Link>
      </div>
    </div>
  );
};
