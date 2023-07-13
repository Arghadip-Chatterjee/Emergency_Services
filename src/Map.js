import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import RideSelector from './RideSelector';
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJnaGFkaXAiLCJhIjoiY2xobHdoZmc3MTV1aTNqbnhmbDgydjU4eSJ9.dQeMUNENDkyWKH-Jwody_A';

const Map = () => {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.4512, 43.6568],
      zoom: 13
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken
    });

    map.addControl(directions, 'top-left');

    directions.on('route', (e) => {
      const newDistance = e.route[0].distance; // meters
      const distanceInMiles = newDistance * 0.001; // convert meters to km
      setDistance(distanceInMiles);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className='background'>
      <div className="map-container">
        <div id="map" className="map" />
      </div>

      <div className='ride-selector-container'>
        <RideSelector distance={distance} />
      </div>
    </div>
  );

};

export default Map;







