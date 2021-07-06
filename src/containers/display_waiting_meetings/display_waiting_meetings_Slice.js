export const selectWaitingMeetingsSortType = (sortType) => {
  return {
    type: 'displayWaitingMeetings/selectWaitingMeetingsSortType',
    payload: sortType,
  };
};

export const updateEnrolledMatchList = matchList => {
  return {
    type: 'displayWaitingMeetings/updateEnrolledMatchList',
    payload: matchList,
  }
};

export const updateWaitingMeetingsLoading = bool => {
  return {
    type: 'displayWaitingMeetings/updateWaitingMeetingsLoading',
    payload: bool,
  }
}

const initialState = {
  sortType: 'current',
  enrolledMatchList: [[], []],
  loading: true,
};

export const displayWaitingMeetingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'displayWaitingMeetings/selectWaitingMeetingsSortType':
      return {
        ...state,
        sortType: action.payload,
      };
    case 'displayWaitingMeetings/updateEnrolledMatchList':
      return {
        ...state,
        enrolledMatchList: action.payload,
      };
    case 'displayWaitingMeetings/updateWaitingMeetingsLoading':
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state;
  }
};
