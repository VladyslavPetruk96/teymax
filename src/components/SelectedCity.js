import React from "react";
import Info from "./Info";
import Form from "./Form";
import Card from "./Card";
import TodayWeather from "./TodayWeather";
import "./Style.css";

const API_KEY = "831d8486f1450b727a16c16d17a813ff";

class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunrise: undefined,
    sunset: undefined,
    humidity: undefined,
    wind: undefined,
    error: undefined,
    days: [],
  };

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await api_url.json();

      let pressure = data.main.pressure;
      let pressureInMmHg = Math.floor(pressure * 0.75006) + " мм рт.ст.";

      let sunTime = (param) => {
        let date = new Date(param * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      };

      let sunrise_date = sunTime(data.sys.sunrise);
      let sunset_date = sunTime(data.sys.sunset);

      const api_url1 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${API_KEY}`
      );
      const data1 = await api_url1.json();
      const dailyData = data1.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: pressureInMmHg,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        sunrise: sunrise_date,
        sunset: sunset_date,
        days: dailyData,
        error: undefined,
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        humidity: undefined,
        wind: undefined,
        sunrise: undefined,
        sunset: undefined,
        days: undefined,
        error: "Введите название города",
      });
    }
  };
  render() {
    return (
      <>
        <div>
          <Info />
        </div>
        <div>
          <Form weatherMethod={this.gettingWeather} />
        </div>
        <div className='content'>
          <TodayWeather
            temp={this.state.temp}
            city={this.state.city}
            country={this.state.country}
            pressure={this.state.pressure}
            wind={this.state.wind}
            humidity={this.state.humidity}
            sunrise={this.state.sunrise}
            sunset={this.state.sunset}
            error={this.state.error}
          />
          <div className='rightBlock'>
            {this.state.days.map((day, index) => (
              <Card day={day} key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default App;
