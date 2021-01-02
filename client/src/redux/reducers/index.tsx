import { combineReducers } from "redux";

import feedReducer from "./feed";
import authReducer from "./auth";

const rootReducer = combineReducers({
  feedReducer,
  authReducer,
});

export default rootReducer;
