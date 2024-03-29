import type { FC } from 'react';
import { Polygon, Polyline, Popup, Marker } from 'react-leaflet';
import type { PathOptions, LatLngExpression } from 'leaflet';

export type LeafletItemProps = {
  type: string;
  properties: {
    id: number;
    name: string;
  };
  geometry: {
    coordinates: LatLngExpression & (LatLngExpression[] | LatLngExpression[][]);
    type: string;
  };
  purpleOptions: PathOptions | undefined;
};

const LeafletItem: FC<LeafletItemProps> = ({
  properties,
  geometry,
  purpleOptions,
}) => {
  
  if (geometry.type === 'Polygon') {
    return (
      <Polygon
        key={properties.id}
        pathOptions={purpleOptions}
        positions={geometry.coordinates}
      >
        {properties.name && <Popup>{properties.name}</Popup>}
      </Polygon>
    );
  }
  if (geometry.type === 'Polyline') {
    return (
      <Polyline
        key={properties.id}
        pathOptions={purpleOptions}
        positions={geometry.coordinates}
      >
        {properties.name && <Popup>{properties.name}</Popup>}
      </Polyline>
    );
  }
  if (geometry.type === 'Point') {
    return (
      <Marker key={properties.id} position={geometry.coordinates}>
        {properties.name && <Popup>{properties.name}</Popup>}
      </Marker>
    );
  }
  return <></>;
};

export { LeafletItem };
