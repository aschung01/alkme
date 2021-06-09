import React from 'react';
import { Header } from '../../components/header/header';

export const DisplayCurrentMeetings = (props) => {
  return(
    <div className="DisplayCurrentMeetings">
      <Header
        backRoute="/home"
        titleText="매칭된 미팅"
      />
    </div>
  )
}