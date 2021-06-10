import React, { useState, useRef } from 'react';
import { SuccessAlert } from '../../components/alerts/alerts';
import { TextButton } from '../../components/buttons/buttons';
import { Header } from '../../components/header/header';
import { MultilineTextField } from '../../components/multiline_text_field/multiline_text_field';
import { updateInputFeedbackDb } from '../../firebase/firebaseDb';
import './feedback.css';
import {
  changeHeaderBackground,
  triggerSuccessAlert,
  updateInputFeedback,
} from './feedbackSlice';

export const Feedback = (props) => {
  const { feedbackPage, dispatch } = props;
  const feedbackView = useRef();

  return (
    <div className="Feedback">
      <span className="FeedbackDot1" />
      <span className="FeedbackDot2" />
      <span className="FeedbackDot3" />
      <span className="FeedbackDot4" />
      <div className="FeedbackHeader">
        <Header
          transparent={feedbackPage.headerTransparent}
          backRoute="/home"
          titleText="지원"
        />
      </div>
      <div
        className="FeedbackView"
        ref={feedbackView}
        onScroll={() => dispatch(changeHeaderBackground(feedbackView))}
      >
        <div className="FeedbackBox">
          <MultilineTextField
            onChange={(e) => dispatch(updateInputFeedback(e.target.value))}
            value={feedbackPage.feedback}
          />
          <div className="FeedbackSuccessAlert">
            <SuccessAlert open={feedbackPage.successAlert} />
          </div>

          <div className="FeedbackButton">
            <TextButton
              buttonText="전송"
              color="#EF515F"
              onClick={(e) => {
                updateInputFeedbackDb(feedbackPage.feedback)
                  .then(() => {
                    dispatch(updateInputFeedback(''));
                    dispatch(triggerSuccessAlert());
                    setTimeout(() => {
                      dispatch(triggerSuccessAlert());
                    }, 2000);
                  })
                  .catch((error) => {
                    console.log(error.message);
                    console.log(error.code);
                  });
              }}
              disabled={feedbackPage.feedback === ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
