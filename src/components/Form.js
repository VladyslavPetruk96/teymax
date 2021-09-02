import React from "react";
// import { Link } from "react-router-dom";

const Form = (props) => (
  <form onSubmit={props.weatherMethod}>
    <input type='text' name='city' placeholder='Город' />
    <button>Получить погоду</button>
    {/* <button as={Link} to='/todayWeather'>Получить погоду</button> */}
  </form>
);

export default Form;
