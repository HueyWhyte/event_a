const initialState = {
  token: localStorage.getItem("x-auth-token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "USER_LODING":
      return {
        ...state,
        isLoading: true,
      };
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("x-auth-token", action.payload.token);
      localStorage.setItem("userId", action.payload.id);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
