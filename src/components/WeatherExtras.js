import React from 'react';
import { Sun, Wind } from 'lucide-react';

const WeatherExtras = ({ sunrise, sunset, airQuality, lastUpdated }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getAirQualityLabel = (aqi) => {
    switch(aqi) {
      case 1: return { label: 'Good', color: 'text-green-500' };
      case 2: return { label: 'Fair', color: 'text-yellow-500' };
      case 3: return { label: 'Moderate', color: 'text-orange-500' };
      case 4: return { label: 'Poor', color: 'text-red-500' };
      case 5: return { label: 'Very Poor', color: 'text-purple-500' };
      default: return { label: 'Unknown', color: 'text-gray-500' };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-6">
          <div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Sun size={18} />
              <span>Sunrise</span>
            </div>
            <div className="text-lg font-semibold">
              {formatTime(sunrise)}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Sun size={18} />
              <span>Sunset</span>
            </div>
            <div className="text-lg font-semibold">
              {formatTime(sunset)}
            </div>
          </div>

          {airQuality && (
            <div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Wind size={18} />
                <span>Air Quality</span>
              </div>
              <div className={`text-lg font-semibold ${getAirQualityLabel(airQuality.list[0].main.aqi).color}`}>
                {getAirQualityLabel(airQuality.list[0].main.aqi).label}
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-500">
          Last updated: {formatTime(lastUpdated)}
        </div>
      </div>
    </div>
  );
};

export default WeatherExtras;