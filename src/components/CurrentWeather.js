import React from 'react';
import { Cloud, CloudRain, CloudSun, Sun, Wind, Droplets, Thermometer } from 'lucide-react';

const CurrentWeather = ({ weather }) => {
  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d': case '01n': return <Sun className="text-yellow-500" size={64} />;
      case '02d': case '02n': case '03d': case '03n': 
        return <CloudSun className="text-gray-600" size={64} />;
      case '04d': case '04n': return <Cloud className="text-gray-600" size={64} />;
      case '09d': case '09n': case '10d': case '10n': 
        return <CloudRain className="text-gray-600" size={64} />;
      default: return <Cloud className="text-gray-600" size={64} />;
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Current Temperature Section */}
      <div className="flex items-center space-x-6">
        <div className="bg-blue-50 p-4 rounded-2xl">
          {getWeatherIcon(weather.weather[0].icon)}
        </div>
        <div>
          <div className="text-6xl font-bold text-gray-800">
            {Math.round(weather.main.temp)}°
          </div>
          <div className="text-xl text-gray-500 capitalize">
            {weather.weather[0].description}
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl transition-all hover:bg-gray-100">
          <div className="flex items-center space-x-2 text-gray-500 mb-2">
            <Thermometer size={18} />
            <span>Feels Like</span>
          </div>
          <div className="text-2xl font-semibold text-gray-800">
            {Math.round(weather.main.feels_like)}°
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl transition-all hover:bg-gray-100">
          <div className="flex items-center space-x-2 text-gray-500 mb-2">
            <Droplets size={18} />
            <span>Humidity</span>
          </div>
          <div className="text-2xl font-semibold text-gray-800">
            {weather.main.humidity}%
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl transition-all hover:bg-gray-100">
          <div className="flex items-center space-x-2 text-gray-500 mb-2">
            <Wind size={18} />
            <span>Wind</span>
          </div>
          <div className="text-2xl font-semibold text-gray-800">
            {Math.round(weather.wind.speed)} m/s
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl transition-all hover:bg-gray-100">
          <div className="flex items-center space-x-2 text-gray-500 mb-2">
            <Cloud size={18} />
            <span>Pressure</span>
          </div>
          <div className="text-2xl font-semibold text-gray-800">
            {weather.main.pressure} hPa
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;