import React, { useState } from "react";
import { connect } from "react-redux";
import TodayWeather from "../components/TodayWeather";
import { requestWeatherAction } from "../redux/Weather/weather.actions";

import styled from "styled-components";
import Card from "../components/Card";

const AppContainer = styled.section`
  background: rgba(0, 0, 0, 0.07);
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  height: 100%;

  div:first-child {
    flex: 1;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-bottom: 1rem;

    & label {
      margin-bottom: 1rem;
      width: 100%;

      input {
        margin-top: 10px;
        outline: none;
        height: 40px;
        width: calc(100% - 7px);
      }
    }

    button {
      height: 40px;
      border: none;
      background: white;
      cursor: pointer;
      transition: 0.2s all;

      &:hover {
        background: black;
        color: white;
      }

      &:disabled {
        background: white;
        cursor: not-allowed;
      }
    }
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    flex-direction: row;
  }
`;

function WeatherPage(props) {
  const { requestWeatherAction, weather, isLoading } = props;
  const [city, setCity] = useState("");

  const handleSearch = (event) => {
    setCity(event.target.value);
  };

  const getWeatherByCity = (event) => {
    event.preventDefault();

    requestWeatherAction(city);
  };

  return (
    <AppContainer className="App">
      <div>
        <form>
          <label htmlFor="city">
            Enter city ty check weather
            <input onChange={handleSearch} placeholder="Enter city" id="city" />
          </label>
          <button disabled={!city} onClick={getWeatherByCity}>
            Get weather
          </button>
        </form>

        {isLoading && <div>Loding...</div>}
        {!isLoading && weather && weather.error ? (
          weather.error
        ) : (
          <div>
            Weather for {city}
            <TodayWeather {...weather} />
          </div>
        )}
      </div>

      <div className="cards">
        {!isLoading && weather && !weather.error
          ? weather?.days.map((day, index) => <Card day={day} key={index} />)
          : null}
      </div>
    </AppContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.weather.isLoading,
    weather: state.weather.weather,
  };
};

const mapDispatchToProps = { requestWeatherAction };

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);
