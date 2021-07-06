export const updateCurrentMatchList = list => {
  return {
    type: 'displayCurrentMeetings/updateCurrentMatchList',
    payload: list,
  }
}

export const updateCurrentMeetingsLoading = bool => {
  return {
    type: 'displayCurrentMeetings/updateCurrentMeetingsLoading',
    payload: bool,
  }
}

const initialState = {
  currentMatchList: [],
  loading: true,
}

export const displayCurrentMeetingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'displayCurrentMeetings/updateCurrentMatchList':
      return {
        ...state,
        currentMatchList: action.payload,
      }
    case 'displayCurrentMeetings/updateCurrentMeetingsLoading':
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state;
  }
}