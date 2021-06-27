export const toggleUserMatchEnrollAlert = () => {
  return {
    type: 'homePage/toggleUserMatchEnrollAlert',
  };
};

const initialState = {
  matchEnrollAlert: false,
};

export const homePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'homePage/toggleUserMatchEnrollAlert':
      return {
        ...state,
        matchEnrollAlert: !state.matchEnrollAlert,
      };
    default:
      return state;
  }
};
