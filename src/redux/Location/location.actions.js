import { getLocationData } from "../../api/app.api";
import { RECEIVE_LOCATION, REQUEST_LOCATION } from "./location.types";

const requestLocation = () => ({
  type: REQUEST_LOCATION,
});

const receiveLocation = (location) => ({
  type: RECEIVE_LOCATION,
  payload: location,
});

export const requestLocationAction = (lat, lon) => {
  return async (dispatch) => {
    dispatch(requestLocation());
    const location = await getLocationData(lat, lon).then(
      (data) => new Promise((resolve) => resolve(data))
    );
    dispatch(receiveLocation(location));
  };
};
