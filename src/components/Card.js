import React from "react";
import "./Style.css";

export default function Card({ day }) {
  const ms = day.dt * 1000;
  const weekdayName = new Date(ms).toLocaleString("ru", {
    weekday: "long",
  });
  const avg_temp = Math.round(
    (day.hasOwnProperty("main") ? ((day.main.temp- 32)*5)/9 : (day.temp.day-273))
  );

  return (
    <div className="blockDay">
      <h3>{weekdayName}</h3>
      <h2>{avg_temp} °C</h2>
      <div className="skyBtn">{day.weather[0].description}</div>
    </div>
  );
}
