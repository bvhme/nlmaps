import {bgLayer, geoLocatorControl} from '../../nlmaps-leaflet/build/nlmaps-leaflet.es.js';
import geolocator from '../../nlmaps-geolocator/build/nlmaps-geolocator.es.js';

let map = L.map('mapdiv').setView([52, 5], 10);
let layers = {
  standaard: bgLayer(), 
};
layers.standaard.addTo(map);
layers.pastel = bgLayer('pastel');
layers.grijs = bgLayer('grijs');
L.control.layers(layers).addTo(map);
let geo = geolocator();
geoLocatorControl(geo).addTo(map);

