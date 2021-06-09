import React from 'react';
import { Header } from '../../components/header/header';

export const DisplayWaitingMeetings = (props) => {
  return(
    <div className="DisplayWaitingMeetings">
      <Header
        backRoute="/home"
        titleText="대기중인 미팅"
      />
    </div>
  )
}