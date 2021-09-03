import { combineReducers } from "redux";

import weatherReducer from "./Weather/weather.reducer";
import locationReducer from "./Location/location.reducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
});

export default rootReducer;
