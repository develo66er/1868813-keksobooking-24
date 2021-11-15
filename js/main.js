import { createOffers } from './data.js';
import { setFormInactive, setFormActive, validateForm, setupAdForm } from './form.js';
import {mapInit, createMarker} from './map.js';
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
mapInit(()=>{
  setFormActive('ad-form');
  setFormActive('map__filters');
  //Добавление пользовательских валидаций формы ввода объявления
  validateForm('.ad-form');
});

const offers = createOffers();
offers.forEach((offerItem) => {
  try {
    createMarker(offerItem);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
});
