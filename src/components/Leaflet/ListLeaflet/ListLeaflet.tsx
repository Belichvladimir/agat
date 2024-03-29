import type { FC } from 'react';
import type { LeafletItemProps } from '../LeafletItem/LeafletItem';
import { cnListLeaflet } from './ListLeaflet.classname';

import './ListLeaflet.css';

type ListLeafletProps = {
  data: LeafletItemProps[];
  removeNewLeafletItem: (id: number) => void;
};

const ListLeaflet: FC<ListLeafletProps> = ({ data, removeNewLeafletItem }) => {
  const handleClick = (id: number) => {
    return () => {
      removeNewLeafletItem(id);
    };
  };
  return (
    <div className={cnListLeaflet()}>
      {data.map((item) => (
        <div key={item.properties.id} className={cnListLeaflet('Item')}>
          <p>{item.properties.name}</p>
          <button
            className={cnListLeaflet('Button')}
            onClick={handleClick(item.properties.id)}
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
};

export { ListLeaflet };
