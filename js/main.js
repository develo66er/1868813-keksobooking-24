import {createOffers} from './data.js';
import {renderPopup} from './template.js';
const offers = createOffers();
const popup  = renderPopup(offers[0]);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(popup);
