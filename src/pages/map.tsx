import {
  GoogleMap,
  MarkerF,
  PolygonF,
  useLoadScript,
} from '@react-google-maps/api';
import { useCallback, useState } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const containerStyle = { width: '100vw', height: '100vh' };

const defaultCenter = { lat: 49.59, lng: -125.89 };

const defaultZoom = 8;

// Visual-related options for fire masks
const trueOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.6,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  zIndex: 1000,
};
const predictedOptions = {
  strokeColor: '#FFFF00',
  strokeOpacity: 0.6,
  strokeWeight: 2,
  fillColor: '#FFFF00',
  fillOpacity: 0.35,
  zIndex: 1,
};

// Locations of markers
// TODO: Retrieve this data from the backend
const locations = [
  { lat: 49.764, lng: -125.7 },
  { lat: 49.507, lng: -125.573 },
  { lat: 49.592, lng: -126.277 },
];

// This data should probably be contained in a json file. This array should pertain to one wildfire. Currently, it is the "True" current day followed by the "Predicted" next day fire mask
const fireSpread = [
  [
    // True
    [
      { lat: 49.79, lng: -125.7 },
      { lat: 49.77, lng: -125.735 },
      { lat: 49.74, lng: -125.7 },
      { lat: 49.785, lng: -125.653 },
    ],
    // Predicted
    [
      { lat: 49.796, lng: -125.703 },
      { lat: 49.776, lng: -125.738 },
      { lat: 49.743, lng: -125.703 },
      { lat: 49.788, lng: -125.656 },
    ],
  ],
];

const Map = () => {
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(-1);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });

  // Related to fire masks
  const renderPolygons = (index: number) => {
    const spread = fireSpread[index];

    return spread !== undefined ? (
      <>
        <PolygonF paths={spread[0]} options={trueOptions} />
        <PolygonF paths={spread[1]} options={predictedOptions} />
      </>
    ) : (
      <></>
    );
  };

  const handleActiveMarker = (marker: number) => {
    setActiveMarker(marker);

    // Set the bounds
    const wildfireMarker = locations[marker];
    const spread = fireSpread[marker];
    const cpmap: any = map;

    if (wildfireMarker !== undefined && spread !== undefined) {
      const bounds = new window.google.maps.LatLngBounds();

      bounds.extend(wildfireMarker);

      const trueMask = spread[0];
      const predMask = spread[1];

      if (trueMask !== undefined) {
        trueMask.forEach((position) => {
          bounds.extend(position);
        });
      }

      if (predMask !== undefined) {
        predMask.forEach((position) => {
          bounds.extend(position);
        });
      }

      cpmap.fitBounds(bounds);
    } else {
      cpmap.setZoom(10);
      cpmap.panTo(locations[marker]);
    }

    setMap(cpmap);
  };

  // Related to wildfire locations
  // <a href="https://www.flaticon.com/free-icons/fire" title="fire icons">Fire icons created by Vectors Market - Flaticon</a>
  const renderMarkers = locations.map((position, i) => {
    return (
      <MarkerF
        key={i}
        position={position}
        icon={'/fire.png'}
        onClick={() => handleActiveMarker(i)}
      />
    );
  });

  const onLoad = useCallback(function callback(m: any) {
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((position) => {
      bounds.extend(position);
    });
    m.fitBounds(bounds);

    setMap(m);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={defaultZoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {renderMarkers}
      {activeMarker >= 0 && renderPolygons(activeMarker)}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
