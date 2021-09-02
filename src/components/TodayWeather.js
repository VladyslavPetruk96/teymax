import React from "react";

const TodayWeather = (props) => (
  <div>
    {props.city && (
      <div className="leftBlock">
        <p>
          Местоположение: {props.city}, {props.country}
        </p>
        <p>Температура: {props.temp}</p>
        <p>Давление: {props.pressure}</p>
        <p>Скорость ветра: {props.wind} м/c</p>
        <p>Влажность: {props.humidity}%</p>
        <p>Восход солнца: {props.sunrise}</p>
        <p>Заход солнца: {props.sunset}</p>
      </div>
    )}
    <p> {props.error} </p>
  </div>
);

export default TodayWeather;
