export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface DailyWeather {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  weathercode: number[];
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  current_weather: CurrentWeather;
  daily: DailyWeather;
  hourly: HourlyWeather;
}

export interface WeatherCondition {
  description: string;
  icon: string;
}
