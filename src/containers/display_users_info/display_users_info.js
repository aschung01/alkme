import React from 'react';
import { Header } from '../../components/header/header';

export const DisplayUsersInfo = (props) => {
  return(
    <div className="DisplayUsersInfo">
      <Header
        backRoute="/home"
        titleText="사용자 정보"
      />
    </div>
  )
}