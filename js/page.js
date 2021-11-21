import { START_LAT, START_LNG } from './config.js';
import { moveMainMarker } from './map.js';
import { setAddress } from './template.js';
import { setupAdForm, setupFilterForm, setFormInactive } from './form.js';
import { getAddData } from './handlers.js';
import { setupFilters } from './filter.js';

const setInitState = () => {
  setupFilters();
  moveMainMarker(START_LAT, START_LNG);
  setAddress(START_LAT, START_LNG);
  setupAdForm();
  setupFilterForm();
  getAddData();
};

const setFailedState = () => {
  setupFilters();
  setupAdForm();
  setupFilterForm();
  setFormInactive('ad-form');
  setFormInactive('map__filters');
};

export { setInitState, setFailedState };
