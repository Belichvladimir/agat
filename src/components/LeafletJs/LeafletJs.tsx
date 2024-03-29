import React, { useEffect } from 'react';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

const LeafletJs = () => {
  useEffect(() => {
    const map = L.map('app').setView([55.763219, 37.60534], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([54.492353359489925, 42.387379676769])
      .addTo(map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();
  }, []);
  return <></>;
};

export { LeafletJs };
