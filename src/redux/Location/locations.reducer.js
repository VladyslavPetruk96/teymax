import { RECEIVE_LOCATION, REQUEST_LOCATION } from "./location.types";

const INITIAL_STATE = {
  isLoading: false,
  location: null,
};

const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_LOCATION:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_LOCATION:
      return {
        isLoading: false,
        location: action.payload,
      };
    default:
      return state;
  }
};

export default locationReducer;
