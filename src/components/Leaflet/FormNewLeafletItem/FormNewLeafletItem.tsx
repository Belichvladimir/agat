import { useState } from 'react';
import type { FC, ChangeEvent, FormEvent } from 'react';
import { cnFormNewLeaflet } from './FormNewLeafletItem.classname';
import type { LatLngExpression } from 'leaflet';

import './FormNewLeafletItem.css';

type FormNewLeafletItemProps = {
  createNewLeafletItem: (coords:LatLngExpression & (LatLngExpression[] | LatLngExpression[][]),name:string) => void;
};

const FormNewLeafletItem: FC<FormNewLeafletItemProps> = ({
  createNewLeafletItem,
}) => {
  const [latitude, setLatitude] = useState<number | undefined | '-'>(undefined);
  const [longitude, setLongitude] = useState<number | undefined | '-'>(undefined);
  const [name, setName] = useState('');
  const [errorInput, setErrorInput] = useState<boolean>(false);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangeLatitude = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setLatitude(undefined);
      return;
    }
    if (event.target.value ==='-') {
      setLatitude(event.target.value);
      return;
    }
    setErrorInput(false);
    const value = Number(event.target.value);
    if (isNaN(value)) {
      setErrorInput(true);
      return;
    }
    if (!(value>=-90 && value<=90)) {
      setLatitude(value);
      setErrorInput(true);
      return;
    }
    setLatitude(value);
  };

  const handleChangeLongitude = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setLongitude(undefined);
      return;
    }
    if (event.target.value ==='-') {
      setLongitude(event.target.value);
      return;
    }
    setErrorInput(false);
    const value = Number(event.target.value);
    if (isNaN(value)) {
      setErrorInput(true);
      return;
    }
    if (!(value>=-180 && value<=180)) {
      setLongitude(value);
      setErrorInput(true);
      return;
    }
    setLongitude(value);
  };

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (latitude && longitude && name && !errorInput) {
      createNewLeafletItem([latitude,longitude] as LatLngExpression & (LatLngExpression[] | LatLngExpression[][]) ,name);
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
        <p className={errorInput ? 'error' : 'error hidden'}>Неверный формат координат</p>
      </div>
      <button className={cnFormNewLeaflet('Button')} type="submit" disabled={errorInput}>Сохранить</button>
    </form>
  );
};

export { FormNewLeafletItem };
