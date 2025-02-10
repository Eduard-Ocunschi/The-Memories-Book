import { combineReducers } from "redux";
import { userSlice } from "./features/auth/userSlice";
import { weatherSlice } from "./features/pages/create-new-page/weatherSlice";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  weather: weatherSlice.reducer,
});
