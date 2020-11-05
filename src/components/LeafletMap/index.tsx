import React,  { useState, useLayoutEffect } from 'react';
import * as L from 'leaflet';
import LeafletMapContext from '../LeafletMapContext';
import { DEFAULT_MAP_ZOOM, DEFAULT_MAP_CENTER } from '../../constants';
import './LeafletMap.scss';

interface LeafletMapProps {
  children: React.ReactNode;
  zoom?: number;
  center?: {
    lat: number;
    long: number;
  },
  testid?: string;
}

const DEFAULT_TEST_ID = 'leaflet-map-container';

const LeafletMap: React.FC<LeafletMapProps> = ({
  children,
  zoom = DEFAULT_MAP_ZOOM,
  center = DEFAULT_MAP_CENTER,
  testid = DEFAULT_TEST_ID
}: LeafletMapProps) =>  {
  const [leafletMap, setLeafletMap] = useState(null as any);

  useLayoutEffect(() => {
    const map = L.map('map', {
      center: L.latLng(center.lat, center.long),
      zoom
    });

    setLeafletMap(map);

    return () => {
      setLeafletMap(null);
    }
  }, []);

  return (
    <LeafletMapContext.Provider value={leafletMap}>
      <div id='map' data-testid={testid}>
        {leafletMap && children}
      </div>
    </LeafletMapContext.Provider>
  );
};

export default LeafletMap;
