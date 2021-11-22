import { setupFormInactiveState} from './form.js';
import { initMapAsync } from './map.js';
import { setInitState } from './page.js';

setupFormInactiveState('ad-form',true);
setupFormInactiveState('map__filters',true);
initMapAsync()
  .then(() => {
    setInitState();
    setupFormInactiveState('ad-form',false);
    setupFormInactiveState('map__filters',false);
  })
  .catch((error) => {
    error.message;
  });


