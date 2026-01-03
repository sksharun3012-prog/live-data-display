import { useState, useEffect } from "react";
import { Cloud, Loader2 } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { CurrentWeather } from "./CurrentWeather";
import { WeatherForecast } from "./WeatherForecast";
import { getWeather } from "@/lib/weatherApi";
import { GeocodingResult, WeatherData } from "@/types/weather";
import { useToast } from "@/hooks/use-toast";

export function WeatherDashboard() {
  const [selectedCity, setSelectedCity] = useState<GeocodingResult | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load default city (New York)
    const defaultCity: GeocodingResult = {
      id: 5128581,
      name: "New York",
      latitude: 40.7143,
      longitude: -74.006,
      country: "United States",
      admin1: "New York",
    };
    setSelectedCity(defaultCity);
  }, []);

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const data = await getWeather(selectedCity.latitude, selectedCity.longitude);
        setWeather(data);
      } catch (error) {
        console.error("Weather fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to fetch weather data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity, toast]);

  const handleSelectCity = (city: GeocodingResult) => {
    setSelectedCity(city);
  };

  return (
    <div className="min-h-screen sky-gradient">
      <div className="container max-w-4xl py-8 px-4">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Cloud className="h-10 w-10 text-primary-foreground/90" />
            <h1 className="text-4xl font-bold text-primary-foreground">
              Weather
            </h1>
          </div>
          <p className="text-primary-foreground/70">
            Real-time weather data from Open-Meteo API
          </p>
        </header>

        {/* Search */}
        <div className="mb-8 animate-slide-up">
          <SearchBar onSelectCity={handleSelectCity} />
        </div>

        {/* Weather Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-primary-foreground animate-spin" />
          </div>
        ) : weather && selectedCity ? (
          <div className="space-y-6">
            <CurrentWeather weather={weather} city={selectedCity} />
            <WeatherForecast weather={weather} />
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-12 text-center weather-shadow animate-fade-in">
            <Cloud className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-lg text-muted-foreground">
              Search for a city to see weather information
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center animate-fade-in">
          <p className="text-sm text-primary-foreground/50">
            Powered by{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary-foreground/70 transition-colors"
            >
              Open-Meteo
            </a>
            {" "}• Free Weather API
          </p>
        </footer>
      </div>
    </div>
  );
}
