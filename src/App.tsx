import { Leaflet } from './components/Leaflet/Leaflet';
import type { LatLngExpression } from 'leaflet';

import './App.css';

const CENTER:LatLngExpression = [55.763219, 37.605340];
const ZOOM = 5;

function App() {
  return (
    <div id="app">
      <Leaflet url={'shapes.json'} center={CENTER} zoom={ZOOM}/>
    </div>
  );
}

export default App;
