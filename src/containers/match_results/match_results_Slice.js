export const updateMatchResults = (list) => {
  return {
    type: 'matchResults/updateMatchResults',
    payload: list,
  };
};

export const updateMatchResultsLoading = (bool) => {
  return {
    type: 'matchResults/updateMatchResultsLoading',
    payload: bool,
  };
};

const initialState = {
  matchResults: [],
  loading: true,
};

export const matchResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'matchResults/updateMatchResults':
      return {
        ...state,
        matchResults: action.payload,
      };
    case 'matchResults/updateMatchResultsLoading':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
