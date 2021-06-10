export const updateInputFeedback = (input) => {
  return {
    type: 'feedbackPage/updateInputFeedback',
    payload: input,
  };
};

export const changeHeaderBackground = (element) => {
  return {
    type: 'feedbackPage/changeHeaderBackground',
    payload: element.current.scrollTop,
  };
};

export const triggerSuccessAlert = () => {
  return {
    type: 'feedbackPage/triggerSuccessAlert',
  };
};

const initialState = {
  feedback: '',
  headerTransparent: true,
  successAlert: false,
};

export const feedbackPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'feedbackPage/updateInputFeedback':
      return {
        ...state,
        feedback: action.payload,
      };
    case 'feedbackPage/changeHeaderBackground':
      if (action.payload > (8 * window.innerHeight) / 100)
        return {
          ...state,
          headerTransparent: false,
        };
      else
        return {
          ...state,
          headerTransparent: true,
        };
    case 'feedbackPage/triggerSuccessAlert':
      return {
        ...state,
        successAlert: !state.successAlert,
      };
    default:
      return state;
  }
};
