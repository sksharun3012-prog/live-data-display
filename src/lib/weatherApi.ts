import { GeocodingResult, WeatherData, WeatherCondition } from "@/types/weather";

const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

export async function searchCities(query: string): Promise<GeocodingResult[]> {
  if (!query || query.length < 2) return [];
  
  const response = await fetch(
    `${GEOCODING_API}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
  );
  
  if (!response.ok) throw new Error("Failed to search cities");
  
  const data = await response.json();
  return data.results || [];
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const response = await fetch(
    `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&hourly=temperature_2m,relative_humidity_2m,weathercode&timezone=auto&forecast_days=7`
  );
  
  if (!response.ok) throw new Error("Failed to fetch weather data");
  
  return response.json();
}

export function getWeatherCondition(code: number): WeatherCondition {
  const conditions: Record<number, WeatherCondition> = {
    0: { description: "Clear sky", icon: "☀️" },
    1: { description: "Mainly clear", icon: "🌤️" },
    2: { description: "Partly cloudy", icon: "⛅" },
    3: { description: "Overcast", icon: "☁️" },
    45: { description: "Foggy", icon: "🌫️" },
    48: { description: "Depositing rime fog", icon: "🌫️" },
    51: { description: "Light drizzle", icon: "🌧️" },
    53: { description: "Moderate drizzle", icon: "🌧️" },
    55: { description: "Dense drizzle", icon: "🌧️" },
    61: { description: "Slight rain", icon: "🌧️" },
    63: { description: "Moderate rain", icon: "🌧️" },
    65: { description: "Heavy rain", icon: "🌧️" },
    71: { description: "Slight snow", icon: "🌨️" },
    73: { description: "Moderate snow", icon: "🌨️" },
    75: { description: "Heavy snow", icon: "❄️" },
    77: { description: "Snow grains", icon: "🌨️" },
    80: { description: "Slight rain showers", icon: "🌦️" },
    81: { description: "Moderate rain showers", icon: "🌦️" },
    82: { description: "Violent rain showers", icon: "⛈️" },
    85: { description: "Slight snow showers", icon: "🌨️" },
    86: { description: "Heavy snow showers", icon: "❄️" },
    95: { description: "Thunderstorm", icon: "⛈️" },
    96: { description: "Thunderstorm with hail", icon: "⛈️" },
    99: { description: "Thunderstorm with heavy hail", icon: "⛈️" },
  };
  
  return conditions[code] || { description: "Unknown", icon: "❓" };
}

export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°`;
}

export function getWindDirection(degrees: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function formatDay(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  
  return date.toLocaleDateString("en-US", { weekday: "short" });
}
