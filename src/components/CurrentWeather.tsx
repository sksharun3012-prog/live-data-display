import { Droplets, Wind, Compass } from "lucide-react";
import { WeatherData, GeocodingResult } from "@/types/weather";
import { getWeatherCondition, formatTemperature, getWindDirection } from "@/lib/weatherApi";

interface CurrentWeatherProps {
  weather: WeatherData;
  city: GeocodingResult;
}

export function CurrentWeather({ weather, city }: CurrentWeatherProps) {
  const condition = getWeatherCondition(weather.current_weather.weathercode);
  const currentHour = new Date().getHours();
  const humidity = weather.hourly.relative_humidity_2m[currentHour] || 0;

  return (
    <div className="glass-card rounded-3xl p-8 weather-shadow animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground/90 mb-1">
          {city.name}
        </h2>
        <p className="text-muted-foreground text-sm">
          {city.admin1 && `${city.admin1}, `}{city.country}
        </p>
      </div>

      <div className="flex flex-col items-center mb-8">
        <span className="text-8xl mb-4 animate-float">{condition.icon}</span>
        <p className="text-7xl font-light temperature-text mb-2">
          {formatTemperature(weather.current_weather.temperature)}
        </p>
        <p className="text-xl text-foreground/80 font-medium">
          {condition.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-4 text-center">
          <Droplets className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-semibold text-foreground">{humidity}%</p>
          <p className="text-xs text-muted-foreground">Humidity</p>
        </div>

        <div className="glass-card rounded-2xl p-4 text-center">
          <Wind className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-semibold text-foreground">
            {Math.round(weather.current_weather.windspeed)}
          </p>
          <p className="text-xs text-muted-foreground">km/h Wind</p>
        </div>

        <div className="glass-card rounded-2xl p-4 text-center">
          <Compass className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-semibold text-foreground">
            {getWindDirection(weather.current_weather.winddirection)}
          </p>
          <p className="text-xs text-muted-foreground">Direction</p>
        </div>
      </div>
    </div>
  );
}
