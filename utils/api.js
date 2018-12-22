export const fetchWeather = async city => {

  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7d8d01d4bfa29829d6bda8459d1e8a64`
  );
  const { name, weather, main } = await response.json();

  return {
    location: name,
    weather: weather[0].main,
    description: weather[0].description,
    temperature: main.temp,
    icon: `http://openweathermap.org/img/w/${weather[0].icon}.png`,
  };
};