export const jumpToPage = page => {
  return {
    type: 'landing/jumpToPage',
    payload: page,
  };
}

export const toggleDisplayInfo = () => {
  return {
    type: 'landing/toggleDisplayInfo',
  }
}

const initialState = {
  page: 1,
  displayInfo: false,
}

export const landingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'landing/jumpToPage':
      return {
        ...state,
        page: action.payload,
      }
    case 'landing/toggleDisplayInfo':
      return {
        ...state,
        displayInfo: !state.displayInfo,
      }
    default:
      return state;
  }
};