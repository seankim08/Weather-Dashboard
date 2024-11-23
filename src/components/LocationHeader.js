import React from 'react';
import { MapPin } from 'lucide-react';

const LocationHeader = ({ location, country }) => {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <MapPin className="text-white" size={24} />
      <h1 className="text-3xl font-bold text-white">
        {location}, {country}
      </h1>
    </div>
  );
};

export default LocationHeader;