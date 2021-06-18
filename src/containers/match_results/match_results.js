import React from 'react';
import { Header } from '../../components/header/header';

export const MatchResults = (props) => {
  return (
    <div className="MatchResults">
      <Header backRoute="/home" titleText="매칭 결과 확인하기" />
    </div>
  );
};
