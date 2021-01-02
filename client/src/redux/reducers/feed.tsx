const initialState = {
  feeds: [],
  feed: {},
};

const feedReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_FEEDS":
      return {
        ...state,
        feeds: action.payload,
      };
    case "GET_FEED":
      return {
        ...state,
        feed: action.payload,
      };

    default:
      return state;
  }
};

export default feedReducer;
