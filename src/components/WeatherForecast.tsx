import { WeatherData } from "@/types/weather";
import { ForecastCard } from "./ForecastCard";

interface WeatherForecastProps {
  weather: WeatherData;
}

export function WeatherForecast({ weather }: WeatherForecastProps) {
  const { daily } = weather;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-foreground/90 mb-4 text-center">
        7-Day Forecast
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {daily.time.map((date, index) => (
          <ForecastCard
            key={date}
            date={date}
            weatherCode={daily.weathercode[index]}
            tempMax={daily.temperature_2m_max[index]}
            tempMin={daily.temperature_2m_min[index]}
            precipitation={daily.precipitation_probability_max[index]}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
