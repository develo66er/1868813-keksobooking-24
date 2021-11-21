import { setFormInactive, setFormActive, setupValidation } from './form.js';
import { initMapAsync } from './map.js';
import { setInitState } from './page.js';

setFormInactive('ad-form');
setFormInactive('map__filters');
initMapAsync()
  .then(() => {
    setupValidation('ad-form');
    setInitState();
    setFormActive('ad-form');
    setFormActive('map__filters');
  })
  .catch((error) => {
    error.message;
  });


