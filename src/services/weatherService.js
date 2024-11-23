const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

// Temperature conversion functions
const celsiusToFahrenheit = (celsius) => (celsius * 9/5) + 32;
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;

// Convert wind speed
const msToMph = (ms) => ms * 2.237;
const mphToMs = (mph) => mph / 2.237;

export const weatherService = {
  getCurrentWeather: async (location, unit = 'metric') => {
    try {
      let endpoint = `${BASE_URL}/weather?`;
      
      if (typeof location === 'object') {
        endpoint += `lat=${location.lat}&lon=${location.lon}`;
      } else {
        endpoint += `q=${location}`;
      }
      
      endpoint += `&appid=${API_KEY}&units=${unit}`;
      
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Weather data fetch failed');
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error('Failed to fetch current weather');
    }
  },

  getForecast: async (location, unit = 'metric') => {
    try {
      let endpoint = `${BASE_URL}/forecast?`;
      
      if (typeof location === 'object') {
        endpoint += `lat=${location.lat}&lon=${location.lon}`;
      } else {
        endpoint += `q=${location}`;
      }
      
      endpoint += `&appid=${API_KEY}&units=${unit}`;
      
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Forecast data fetch failed');
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error('Failed to fetch forecast');
    }
  },

  convertTemperature: (temp, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return temp;
    return fromUnit === 'metric' 
      ? celsiusToFahrenheit(temp) 
      : fahrenheitToCelsius(temp);
  },

  convertWindSpeed: (speed, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return speed;
    return fromUnit === 'metric'
      ? msToMph(speed)
      : mphToMs(speed);
  }
};