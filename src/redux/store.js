import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import locationReducer from "./Location/locations.reducer";
import weatherReducer from "./Weather/weather.reducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
});

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
