import { RECEIVE_WEATHER, REQUEST_WEATHER } from "./weather.types";

const INITIAL_STATE = {
  isLoading: false,
  weather: null,
};

const weatherReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_WEATHER:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_WEATHER:
      return {
        isLoading: false,
        weather: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
