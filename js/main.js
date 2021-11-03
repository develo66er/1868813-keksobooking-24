import {createOffers} from './data.js';
import {renderPopup} from './template.js';
import {setFormInactive, setFormActive} from './form.js';

const offers = createOffers();
const popup  = renderPopup(offers[0]);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(popup);
/**
 * При открытии страница находится в неактивном состоянии:
 */
/**
 *Форма .ad-form заблокирована —
 * на форму добавлен специальный класс, а на её интерактивные элементы атрибуты disabled.
 */
setFormInactive('ad-form');
/**
 * Форма с фильтрами .map__filters заблокирована-
 * на форму добавлен специальный класс, а на её интерактивные элементы атрибуты disabled.
 */
setFormInactive('map__filters');

setTimeout(()=>{
  setFormActive('ad-form');
  setFormActive('map__filters');
}, 5000);
