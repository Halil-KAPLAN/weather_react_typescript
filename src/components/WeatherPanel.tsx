import { WeatherData } from "../types";

interface Props {
  weather: WeatherData;
}

const weatherPanel: React.FC<Props> = ({ weather }) => {

  return (
    <div>
      <h3>{weather.name}</h3>
      <h4>{weather.weather.map((data) => data.description).join(", ")}</h4>
      <p>{weather.main.temp} °C</p>
      <p>{new Date(weather.dt * 1000).toLocaleDateString()}</p>
    </div>
  );
};

export default weatherPanel;
