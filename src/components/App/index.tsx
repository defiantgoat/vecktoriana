import React from 'react';
import LeafletMap from '../LeafletMap';
import LeafletTileLayer from '../LeafletTileLayer';
import { config } from '../../config';
import './App.scss';

const App: React.FC = () =>  {

  return (
    <div className='app'>
        <LeafletMap
          zoom={config.mapZoom}
          center={config.mapCenter}
        >
          <LeafletTileLayer
            layerId='osm'
            tileUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LeafletMap>
    </div>
  );
};

export default App;
