const defaultState = {
    currentIndex: 0
  };
  
  const EDIT_CURRENT_INDEX = "EDIT_CURRENT_INDEX";
  
  export const currentIndexReducer = (state = defaultState, action) => {
    switch (action.type) {
      case EDIT_CURRENT_INDEX:
        return {
            currentIndex: state.currentIndex = action.payload
        };
      default:
        return state;
    }
  };
  
  export const editCurrentIndex = (payload) => ({
    type: EDIT_CURRENT_INDEX,
    payload,
  });
  