import { Dispatch } from "redux";
import { FeedProps } from "../../assets/types";

export const fetchFeeds = (data: FeedProps[]) => (dispatch: Dispatch) => {
  dispatch({
    type: "GET_FEEDS",
    payload: data,
  });
};

export const fetchFeed = (data: FeedProps[]) => (dispatch: Dispatch) => {
  dispatch({
    type: "GET_FEED",
    payload: data,
  });
};
