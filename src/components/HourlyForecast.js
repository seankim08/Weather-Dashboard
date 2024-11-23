import React from 'react';
import { Sun, Cloud, CloudRain, CloudSun } from 'lucide-react';

const HourlyForecast = ({ forecast, unit }) => {
  if (!forecast?.list) return null;

  const hourlyData = forecast.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000),
    temp: Math.round(item.main.temp),
    icon: item.weather[0].icon,
    description: item.weather[0].description,
    precipitation: Math.round(item.pop * 100),
    windSpeed: Math.round(item.wind.speed)
  }));

  // Find temperature range
  const minTemp = Math.min(...hourlyData.map(item => item.temp));
  const maxTemp = Math.max(...hourlyData.map(item => item.temp));

  const calculatePosition = (temp) => {
    const range = maxTemp - minTemp;
    if (range === 0) return 50;
    // Using 60% of the width with 20% padding on each side
    return ((temp - minTemp) / range) * 60 + 20;
  };

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d': case '01n': return <Sun size={20} />;
      case '02d': case '02n': case '03d': case '03n': return <CloudSun size={20} />;
      case '04d': case '04n': return <Cloud size={20} />;
      case '09d': case '09n': case '10d': case '10n': return <CloudRain size={20} />;
      default: return <Cloud size={20} />;
    }
  };

  return (
    <div className="forecast-section">
      <h3 className="forecast-title">Hourly Forecast</h3>
      <div className="hourly-forecast">
        {hourlyData.map((hour, index) => (
          <div key={index} className="hourly-item">
            <div className="hourly-time">
              {hour.time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </div>
            <div className="weather-icon">
              {getWeatherIcon(hour.icon)}
            </div>
            <div className="temp-container">
              <span 
                style={{ 
                  position: 'absolute',
                  left: `${calculatePosition(hour.temp)}%`,
                  transform: 'translateX(-50%)',
                  minWidth: '40px',
                  textAlign: 'center'
                }}
              >
                {hour.temp}°{unit === 'metric' ? 'C' : 'F'}
              </span>
            </div>
            <div className="precipitation">{hour.precipitation}%</div>
            <div className="wind-speed">
              {hour.windSpeed} {unit === 'metric' ? 'm/s' : 'mph'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;