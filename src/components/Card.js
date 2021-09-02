import React from 'react';
import "./Style.css";

export default class Card extends React.Component {

  render() {    
    const ms = this.props.day.dt * 1000;
    const weekdayName = new Date(ms).toLocaleString('ru', {weekday: 'long'});
    let avg_temp = Math.round(((this.props.day.main.temp) - 32) * 5 / 9);

    return (
      <div className="blockDay">
          <h3>{weekdayName}</h3>
          <h2>{avg_temp} °C</h2>
          <div className="skyBtn">{this.props.day.weather[0].description}</div>
      </div>
    )
  }
}