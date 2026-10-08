import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Calgary as default coordinates
const calgary = [-114.0899, 51.0628];

// adds a point to the map
// const pointGeometry = new Point(fromLonLat(myCoordinates));

const map = new Map({
  target: 'map',
  view: new View({
    center: fromLonLat(calgary),
    zoom: 16
  }),
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ]
});
