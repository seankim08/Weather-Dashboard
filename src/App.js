import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Search } from 'lucide-react';
import useWeather from './hooks/useWeather';
import HourlyForecast from './components/HourlyForecast';
import FiveDayForecast from './components/FiveDayForecast';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [unit, setUnit] = useState('metric');
  const [lastLocation, setLastLocation] = useState(null);
  const { weather, forecast, isLoading, error, fetchWeatherData } = useWeather();

  // Update the initializeWeather function in App.js
  const initializeWeather = useCallback(async () => {
    // We check lastLocation inside the callback
    if (!lastLocation) {
      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const location = {
            type: 'coords',
            value: {
              lat: position.coords.latitude,
              lon: position.coords.longitude
            }
          };
          setLastLocation(location);
          await fetchWeatherData(location.value, unit);
        }
      } catch (error) {
        console.error("Geolocation error:", error);
        const defaultLocation = { type: 'city', value: 'London' };
        setLastLocation(defaultLocation);
        await fetchWeatherData(defaultLocation.value, unit);
      }
    }
  }, [fetchWeatherData, unit, lastLocation]); // Add lastLocation to dependencies

  // Initial load effect
  useEffect(() => {
    initializeWeather();
  }, [initializeWeather]);

  // Effect to handle unit changes
  useEffect(() => {
    if (lastLocation) {
      fetchWeatherData(lastLocation.value, unit);
    }
  }, [unit, lastLocation, fetchWeatherData]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newLocation = { type: 'city', value: searchQuery };
      setLastLocation(newLocation);
      fetchWeatherData(newLocation.value, unit);
    }
  }, [searchQuery, unit, fetchWeatherData]);

  const handleCurrentLocation = useCallback(async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const location = {
          type: 'coords',
          value: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
        };
        setLastLocation(location);
        await fetchWeatherData(location.value, unit);
      } catch (error) {
        console.error("Geolocation error:", error);
      }
    }
  }, [fetchWeatherData, unit]);

  const toggleUnit = useCallback(() => {
    setUnit(prevUnit => prevUnit === 'metric' ? 'imperial' : 'metric');
  }, []);

  return (
    <div className="container">
      <div className="header">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            <Search size={20} />
          </button>
          <button
            type="button"
            onClick={handleCurrentLocation}
            className="search-button"
          >
            <MapPin size={20} />
          </button>
        </form>

        <button onClick={toggleUnit} className="unit-toggle">
          °{unit === 'metric' ? 'C' : 'F'}
        </button>
      </div>

      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {weather && !isLoading && (
        <>
          <div className="location-header">
            {weather.name}, {weather.sys.country}
          </div>

          <div className="current-weather">
            <div className="weather-main">
              {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
            </div>
            <div className="weather-description">
              {weather.weather[0].description}
            </div>
            <div className="weather-details">
              <div className="weather-detail-item">
                <span>Feels Like</span>
                <span>{Math.round(weather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}</span>
              </div>
              <div className="weather-detail-item">
                <span>Humidity</span>
                <span>{weather.main.humidity}%</span>
              </div>
              <div className="weather-detail-item">
                <span>Wind</span>
                <span>{Math.round(weather.wind.speed)} {unit === 'metric' ? 'm/s' : 'mph'}</span>
              </div>
              <div className="weather-detail-item">
                <span>Pressure</span>
                <span>{weather.main.pressure} hPa</span>
              </div>
            </div>
          </div>

          <HourlyForecast forecast={forecast} unit={unit} />
          <FiveDayForecast forecast={forecast} unit={unit} />
        </>
      )}
    </div>
  );
};

export default App;