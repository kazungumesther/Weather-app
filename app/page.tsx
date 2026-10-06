"use client";

import { useState } from "react";
import "./globals.css";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = process.env.WEATHER_API_KEY;


  const getWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch {
      setWeather(null);
      setError("City not found");
    }

    setLoading(false);
  };

  const weatherEmoji = (condition: string) => {
    switch (condition) {
      case "Clear":
        return "";
      case "Clouds":
        return "";
      case "Rain":
        return "";
      case "Thunderstorm":
        return "";
      case "Snow":
        return "";
      default:
        return "";
    }
  };

  return (
    <main className="container">
      <div className="weather-card">

        <h1>  Weather App</h1>

        <p>{new Date().toDateString()}</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={getWeather}>
            Search
          </button>
        </div>

        {loading && <p>Loading...</p>}

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>
              {weatherEmoji(weather.weather[0].main)} {weather.name}
            </h2>

            <p> Temperature: {weather.main.temp}°C</p>

            <p> Feels Like: {weather.main.feels_like}°C</p>

            <p> Condition: {weather.weather[0].main}</p>

            <p> Humidity: {weather.main.humidity}%</p>

            <p> Wind Speed: {weather.wind.speed} m/s</p>

            <p>Visibility: {weather.visibility / 1000} km</p>
          </div>
        )}
      </div>
    </main>
  );
}
