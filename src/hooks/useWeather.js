import { useState, useCallback } from 'react';
import { weatherService } from '../services/weatherService';

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUnit, setCurrentUnit] = useState('metric');

  const fetchWeatherData = useCallback(async (location, unit = 'metric') => {
    setIsLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(location, unit),
        weatherService.getForecast(location, unit)
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setCurrentUnit(unit);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const convertData = useCallback((data, fromUnit, toUnit) => {
    if (!data || fromUnit === toUnit) return data;

    // Convert current weather data
    const convertedTemp = weatherService.convertTemperature(data.main.temp, fromUnit, toUnit);
    const convertedFeelsLike = weatherService.convertTemperature(data.main.feels_like, fromUnit, toUnit);
    const convertedWindSpeed = weatherService.convertWindSpeed(data.wind.speed, fromUnit, toUnit);

    return {
      ...data,
      main: {
        ...data.main,
        temp: convertedTemp,
        feels_like: convertedFeelsLike
      },
      wind: {
        ...data.wind,
        speed: convertedWindSpeed
      }
    };
  }, []);

  const convertForecast = useCallback((forecastData, fromUnit, toUnit) => {
    if (!forecastData || fromUnit === toUnit) return forecastData;

    return {
      ...forecastData,
      list: forecastData.list.map(item => ({
        ...item,
        main: {
          ...item.main,
          temp: weatherService.convertTemperature(item.main.temp, fromUnit, toUnit),
          feels_like: weatherService.convertTemperature(item.main.feels_like, fromUnit, toUnit)
        },
        wind: {
          ...item.wind,
          speed: weatherService.convertWindSpeed(item.wind.speed, fromUnit, toUnit)
        }
      }))
    };
  }, []);

  return {
    weather,
    forecast,
    isLoading,
    error,
    fetchWeatherData,
    currentUnit,
    convertData,
    convertForecast
  };
};

export default useWeather;