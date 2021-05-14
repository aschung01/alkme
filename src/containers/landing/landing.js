import React from 'react';
import { Link } from 'react-router-dom';
import {
  RegisterOrLoginButton,
  TextButton,
} from '../../components/buttons/buttons.js';
import './landing.css';

export const Landing = () => {
  return (
    <div className="Landing">
      <div className="LogoSection"></div>
      <div className="RegisterOrLogin">
          <Link to="/register" className="RegisterButton">
            <RegisterOrLoginButton buttonText="회원가입" />
          </Link>
          <Link to="/login" className="LoginTextButton">
            <TextButton buttonText="로그인" />
          </Link>
      </div>
    </div>
  );
};
