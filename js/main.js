import {createOffers} from './data.js';
import {renderPopup} from './template.js';
import {setFormInactive, setFormActive,validateForm,setupAdForm} from './form.js';

const offers = createOffers();
const popup  = renderPopup(offers[0]);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(popup);
/**
 * синхронизация полей формы
 */
setupAdForm('ad-form');
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
  //Добавление пользовательских валидаций формы ввода объявления
  validateForm('.ad-form');
}, 5000);
