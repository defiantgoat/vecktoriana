import React, { useContext, useEffect } from 'react';
import { TileLayer } from 'leaflet';
import LeafletMapContext from '../LeafletMapContext';

interface LeafeletTileLayerProps {
  tileUrl: string;
  layerId: string;
  attribution?: string;
  zIndex?: number;
}

const LeafletTileLayer: React.FC<LeafeletTileLayerProps> = ({tileUrl, layerId, zIndex = 0, attribution = ''}) => {
  const leafletMap = useContext(LeafletMapContext);

  useEffect(() => {
    const tileLayer = new TileLayer(tileUrl, {
      id: layerId,
      attribution,
      zIndex
    });
    
    leafletMap?.addLayer(tileLayer);

    return () => {
      leafletMap?.removeLayer(tileLayer);
    }
  }, [leafletMap])

  return null;
};

export default LeafletTileLayer;
