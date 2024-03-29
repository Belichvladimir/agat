/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [latitude, setLatitude] = useState<any>('');
  const [longitude, setLongitude] = useState<any>('');
  const [name, setName] = useState('');

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangeLatitude = (event: ChangeEvent<HTMLInputElement>) => {
    setLatitude(event.target.value);
  };

  const handleChangeLongitude = (event: ChangeEvent<HTMLInputElement>) => {
    setLongitude(event.target.value);
  };

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (latitude && longitude && name) {
      createNewLeafletItem([latitude,longitude],name);
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
      </div>
      <button className={cnFormNewLeaflet('Button')} type="submit">Сохранить</button>
    </form>
  );
};

export { FormNewLeafletItem };
