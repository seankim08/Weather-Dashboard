import React from 'react';
import { Sun, Cloud, CloudRain, CloudSun } from 'lucide-react';

const FiveDayForecast = ({ forecast, unit }) => {
  if (!forecast?.list) return null;

  // Process forecast data
  const dailyForecasts = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = {
        date: new Date(item.dt * 1000),
        temp: item.main.temp,  // Use single temperature
        icon: item.weather[0].icon,
        precipitation: item.pop
      };
    }
    return acc;
  }, {});

  const fiveDayData = Object.values(dailyForecasts).slice(0, 5);

  // Find temperature range
  const minTemp = Math.min(...fiveDayData.map(day => day.temp));
  const maxTemp = Math.max(...fiveDayData.map(day => day.temp));

  const calculatePosition = (temp) => {
    const range = maxTemp - minTemp;
    if (range === 0) return 50;
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
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="daily-forecast">
        {fiveDayData.map((day, index) => (
          <div key={index} className="daily-item">
            <div className="daily-date">
              {index === 0 ? 'Today' : day.date.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="weather-icon">
              {getWeatherIcon(day.icon)}
            </div>
            <div className="temp-container">
              <span 
                style={{ 
                  position: 'absolute',
                  left: `${calculatePosition(day.temp)}%`,
                  transform: 'translateX(-50%)',
                  minWidth: '40px',
                  textAlign: 'center'
                }}
              >
                {Math.round(day.temp)}°{unit === 'metric' ? 'C' : 'F'}
              </span>
            </div>
            <div className="precipitation">
              {Math.round(day.precipitation * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;