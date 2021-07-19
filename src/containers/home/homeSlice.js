export const toggleUserMatchEnrollAlert = () => {
  return {
    type: 'homePage/toggleUserMatchEnrollAlert',
  };
};

export const toggleUserMatchEnrollSuccessAlert = () => {
  return {
    type: 'homePage/toggleUserMatchEnrollSuccessAlert',
  };
};

const initialState = {
  matchEnrollAlert: false,
  matchEnrollSuccessAlert: false,
};

export const homePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'homePage/toggleUserMatchEnrollAlert':
      return {
        ...state,
        matchEnrollAlert: !state.matchEnrollAlert,
      };
    case 'homePage/toggleUserMatchEnrollSuccessAlert':
      return {
        ...state,
        matchEnrollSuccessAlert: !state.matchEnrollSuccessAlert,
      }
    default:
      return state;
  }
};
