import { useEffect, useState } from 'react';
import type { FC, CSSProperties } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { LeafletItem } from './LeafletItem/LeafletItem';
import { FormNewLeafletItem } from './FormNewLeafletItem/FormNewLeafletItem';
import { cnLeaflet } from './Leaflet.classname';
import { flipCoords } from './utils/flipCoords';
import { ListLeaflet } from './ListLeaflet/ListLeaflet';
import FadeLoader from 'react-spinners/FadeLoader';
import type { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { add, remove, addArray } from '../store/leafletSlice'

import 'leaflet/dist/leaflet.css';
import './Leaflet.css';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
  zIndex: 10000,
};

type LeafletProps = {
  url: string;
  center: LatLngExpression;
  zoom: number;
};

const Leaflet: FC<LeafletProps> = ({ url, center, zoom }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const listLeaflets = useSelector((state: RootState) => state.leaflets.data)
  const dispatch = useDispatch()
  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((result) => {

        flipCoords(result);
        dispatch(addArray(result));

      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, error, dispatch]);

  const createNewLeafletItem = (
    coords: LatLngExpression & (LatLngExpression[] | LatLngExpression[][]),
    name: string
  ) => {
    const newItem = {
      type: 'Feature',
      properties: {
        id: Number(Date.now()),
        name: name,
      },
      geometry: {
        coordinates: coords,
        type: 'Point',
      },
      purpleOptions: undefined,
    };
    
    dispatch(add(newItem));
  };
  const removeNewLeafletItem = (id: number) => {
    dispatch(remove(id));
  };
  const handleClick = () => {
    setError(false);
  };

  return (
    <>
      <MapContainer
        className={cnLeaflet()}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {listLeaflets.length > 0 &&
          listLeaflets.map((item) => (
            <LeafletItem key={item.properties.id} {...item} />
          ))}
        {listLeaflets.length > 0 && (
          <ListLeaflet
            data={listLeaflets}
            removeNewLeafletItem={removeNewLeafletItem}
          />
        )}
        <FormNewLeafletItem createNewLeafletItem={createNewLeafletItem} />
        <FadeLoader color="red" cssOverride={override} loading={loading} />
        {error && (
          <div className={cnLeaflet('Error')}>
            <p>Ошибка подключения</p>
            <button onClick={handleClick}>Повторить</button>
          </div>
        )}
      </MapContainer>
    </>
  );
};
export { Leaflet };
