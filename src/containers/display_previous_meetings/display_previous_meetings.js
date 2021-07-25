import React from 'react';
import { Header } from '../../components/header/header';

export const DisplayPreviousMeetings = (props) => {
  return(
    <div className="DisplayPreviousMeetings">
      <Header
        backRoute="/home"
        titleText="완료된 미팅"
      />
    </div>
  )
}