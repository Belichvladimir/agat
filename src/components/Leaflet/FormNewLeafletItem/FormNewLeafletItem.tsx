import { useState } from 'react';
import type { FC, ChangeEvent, FormEvent } from 'react';
import { cnFormNewLeaflet } from './FormNewLeafletItem.classname';
import type { LatLngExpression } from 'leaflet';

import './FormNewLeafletItem.css';

const LATITUDE_DEGREE = 90;

const LONGITUDE_DEGREE = 180;

type FormNewLeafletItemProps = {
  createNewLeafletItem: (
    coords: LatLngExpression & (LatLngExpression[] | LatLngExpression[][]),
    name: string
  ) => void;
};

const checkValidInput = (
  latitude: string,
  longitude: string,
  cbError: (error: boolean) => void
): boolean => {
  if (!latitude && !longitude) return false;
  const inputLatitude = Number(latitude);
  const inputLongitude = Number(longitude);
  if (isNaN(inputLatitude) || isNaN(inputLongitude)) {
    cbError(true);
    return false;
  }
  if (
    /^[+-]?\d+(\.\d+)?$/.test(latitude) &&
    /^[+-]?\d+(\.\d+)?$/.test(longitude) &&
    inputLatitude >= -LATITUDE_DEGREE &&
    inputLatitude <= LATITUDE_DEGREE &&
    inputLongitude >= -LONGITUDE_DEGREE &&
    inputLongitude <= LONGITUDE_DEGREE
  ) {
    cbError(false);
    return true;
  }
  cbError(true);
  return false;
};

const FormNewLeafletItem: FC<FormNewLeafletItemProps> = ({
  createNewLeafletItem,
}) => {
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [name, setName] = useState('');
  const [errorInput, setErrorInput] = useState<boolean>(false);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangeLatitude = (event: ChangeEvent<HTMLInputElement>) => {
    setLatitude(event.target.value);
  };

  const handleChangeLongitude = (event: ChangeEvent<HTMLInputElement>) => {
    setLongitude(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (latitude === undefined && longitude === undefined) return;

    if (checkValidInput(latitude, longitude, setErrorInput) && name) {
      createNewLeafletItem(
        [Number(latitude), Number(longitude)] as LatLngExpression &
          (LatLngExpression[] | LatLngExpression[][]),
        name
      );
      setLatitude('');
      setLongitude('');
      setName('');
    }
  };

  return (
    <form className={cnFormNewLeaflet()} onSubmit={handleSubmit}>
      <div className={cnFormNewLeaflet('GroupInput')}>
        <input
          className={cnFormNewLeaflet('Input')}
          type="text"
          onChange={handleChangeName}
          value={name}
          placeholder="Имя"
        />
        <input
          className={cnFormNewLeaflet('Input')}
          type="text"
          onChange={handleChangeLatitude}
          value={latitude}
          placeholder="Широта"
        />
        <input
          className={cnFormNewLeaflet('Input')}
          type="text"
          onChange={handleChangeLongitude}
          value={longitude}
          placeholder="Долгота"
        />
        <p className={errorInput ? 'error' : 'error hidden'}>
          Неверный формат координат
        </p>
      </div>
      <button className={cnFormNewLeaflet('Button')} type="submit">
        Сохранить
      </button>
    </form>
  );
};

export { FormNewLeafletItem };
