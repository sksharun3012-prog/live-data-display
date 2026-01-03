import { Droplets } from "lucide-react";
import { getWeatherCondition, formatTemperature, formatDay } from "@/lib/weatherApi";

interface ForecastCardProps {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  index: number;
}

export function ForecastCard({
  date,
  weatherCode,
  tempMax,
  tempMin,
  precipitation,
  index,
}: ForecastCardProps) {
  const condition = getWeatherCondition(weatherCode);

  return (
    <div
      className="glass-card rounded-2xl p-4 text-center weather-shadow hover:scale-105 transition-transform duration-300 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <p className="text-sm font-medium text-foreground/80 mb-2">
        {formatDay(date)}
      </p>
      
      <span className="text-4xl block mb-3">{condition.icon}</span>
      
      <div className="mb-2">
        <span className="text-xl font-semibold text-foreground">
          {formatTemperature(tempMax)}
        </span>
        <span className="text-muted-foreground mx-1">/</span>
        <span className="text-lg text-muted-foreground">
          {formatTemperature(tempMin)}
        </span>
      </div>

      {precipitation > 0 && (
        <div className="flex items-center justify-center gap-1 text-primary">
          <Droplets className="h-3 w-3" />
          <span className="text-xs font-medium">{precipitation}%</span>
        </div>
      )}
    </div>
  );
}
