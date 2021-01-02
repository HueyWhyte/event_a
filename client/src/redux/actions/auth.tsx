import { Dispatch } from "redux";
import { UserProps } from "../../assets/types";

export const loadUser = (data: UserProps) => (
  dispatch: Dispatch,
  getState: any
) => {
  const token = getState().authReducer.token;

  dispatch({
    type: "USER_LODING",
  });

  if (token) {
    dispatch({
      type: "USER_LOADED",
      payload: data,
    });
  }
};

export const logInUser = (User: UserProps) => (dispatch: Dispatch) => {
  dispatch({
    type: "LOGIN_SUCCESS",
    payload: User,
  });
};

export const registerUser = (User: UserProps) => (dispatch: Dispatch) => {
  dispatch({
    type: "REGISTER_SUCCESS",
    payload: User,
  });
};
