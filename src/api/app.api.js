const sunTime = (param) => {
  let date = new Date(param * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
};

export default async function getWeatherByCity(city) {
  const responseDaily = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
  );
  const responseGeneral = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
  );

  const dataDaily = await responseDaily.json();
  const dataGeneral = await responseGeneral.json();

  if (dataGeneral.cod === "404" || responseGeneral === "404")
    return { error: "City do not exists" };

  const dailyData = dataDaily.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  const generatePressure =
    Math.floor(dataGeneral.main.pressure * 0.75006) + " мм рт.ст.";

  let sunrise_date = sunTime(dataGeneral.sys.sunrise);
  let sunset_date = sunTime(dataGeneral.sys.sunset);

  return {
    temp: dataGeneral.main.temp,
    city: dataGeneral.name,
    country: dataGeneral.sys.country,
    pressure: generatePressure,
    wind: dataGeneral.wind.speed,
    humidity: dataGeneral.main.humidity,
    sunrise: sunrise_date,
    sunset: sunset_date,
    days: dailyData,
    error: null,
  };
}

export async function getLocationData(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
  );
  const data = await response.json();
  return data;
}
