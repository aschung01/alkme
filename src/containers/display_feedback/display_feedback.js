import React from 'react';
import { Header } from '../../components/header/header';

export const DisplayFeedback = (props) => {
  
  return(
    <div className="DisplayFeedback">
      <Header
        backRoute="/home"
        titleText="피드백 확인"
      />
    </div>
  )
}