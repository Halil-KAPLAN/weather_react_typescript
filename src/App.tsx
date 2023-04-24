import axios from "axios";
import { useEffect, useState } from "react";
import { GetWeatherData, WeatherData } from "./types";
import { usePosition } from "use-position";
import WeatherPanel from "./components/WeatherPanel";

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const { latitude, longitude } = usePosition(true);

  const getWeatherData: GetWeatherData = async (lat, lon) => {
    const API_Key = process.env.REACT_APP_WEATHER_API_KEY;
    const lang=navigator.language;

    try {
      const { data } = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}&units=metric&lang=${lang}`
      );
      setWeather(data);
    } catch (e) {
      console.log("Axios Error:", e);
    }
  };

  useEffect(() => {
    latitude && longitude && getWeatherData(latitude, longitude);
  }, [latitude, longitude]);

  //console.log(latitude, longitude, weather);

  return (
    <div>
      <h2>Weather</h2>
      {weather ? (
        <WeatherPanel weather={weather} />
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default App;
