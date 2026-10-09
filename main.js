import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';
import OSM from 'ol/source/OSM';
import Style from 'ol/style/Style.js';
import Icon from 'ol/style/Icon.js';
import { fromLonLat, toLonLat } from 'ol/proj';
import Select from 'ol/interaction/Select';
import {click} from 'ol/events/condition';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';

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

// Add SAIT event coords
const SAITCoords = [-114.0899, 51.0628];
addPoint('SAIT', SAITCoords, 'images/Pin.png');

// add friend coords
const friend1Coords = [-114.0893, 51.0615];
const friend2Coords = [-114.0792, 51.0615];
const friend3Coords = [-114.0801, 51.0645];
const friend4Coords = [-114.0921, 51.0635];
addPoint('Daerin', friend1Coords);
addPoint('Eason', friend2Coords);
addPoint('Ross', friend3Coords);
addPoint('Scott', friend4Coords);

// Create the select interaction for single clicks
const selectClick = new Select({
  condition: click
});

// Add the interaction to your map
map.addInteraction(selectClick);

// Listen to the select event
selectClick.on('select', (e) => {
  const selectedFeatures = e.selected;
  if (selectedFeatures.length > 0) {
    const clickedFeature = selectedFeatures[0];
    const coordinates = clickedFeature.getGeometry().getCoordinates();
    
    console.log('Clicked point coordinates:', coordinates);
    // Access feature properties/attributes
    console.log('Feature property:', clickedFeature.get('propertyName'));
    
    const modalElement = document.getElementById('myModal');
    const myModal = new bootstrap.Modal(modalElement);

    // update modal content with clicked point information
    const lonLat = toLonLat(coordinates);

    document.getElementById('targetTitle').textContent = clickedFeature.get('name');
    document.getElementById('targetBody').textContent = `Longitude: ${lonLat[0]}, Latitude: ${lonLat[1]}`;
    myModal.show();
  }
});

/*******************************************************************************/

/**
 * Add a point to the map at the specified coordinates.
 * @param {*} coordinates The coordinates where the point should be added, in [longitude, latitude] format.
 * @param {*} icon The icon URL to use for the point.
 */
function addPoint(name, coordinates, icon) {
  const pointFeature = new Feature({
    geometry: new Point(fromLonLat(coordinates)),
    name: name
  });

  const vectorSource = new VectorSource({
    features: [pointFeature],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const markerStyle = new Style({
    image: new Icon({
      anchor: [0.5, 0.5],
      src: icon || 'images/User.png', 
    }),
  });

  // 5. Add the point layer to your map
  vectorLayer.setStyle(markerStyle);
  map.addLayer(vectorLayer);
}