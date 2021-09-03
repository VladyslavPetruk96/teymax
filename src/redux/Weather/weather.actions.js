import getWeatherByCity from "../../api/app.api";
import { RECEIVE_WEATHER, REQUEST_WEATHER } from "./weather.types";

const requestWeather = () => ({
  type: REQUEST_WEATHER,
});

const receiveWeather = (weather) => ({
  type: RECEIVE_WEATHER,
  payload: weather,
});

export const requestWeatherAction = (city) => {
  return async (dispatch) => {
    dispatch(requestWeather());
    const weather = await getWeatherByCity(city).then(
      (data) => new Promise((resolve) => resolve(data))
    );
    dispatch(receiveWeather(weather));
  };
};
