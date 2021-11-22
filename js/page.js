import { START_LAT, START_LNG } from './config.js';
import { moveMainMarker } from './map.js';
import { setAddress,outputFormSendErrorMessage } from './template.js';
import { setupAdForm, setupFilterForm, setupFormInactiveState,setAddFormSubmit } from './form.js';
import { getAddData,outputFormSendSuccessMessageHandler } from './handlers.js';

const setInitState = () => {
  moveMainMarker(START_LAT.toFixed(5), START_LNG.toFixed(5));
  setAddress(START_LAT, START_LNG);
  setupAdForm();
  setupFilterForm();
  getAddData();
  setAddFormSubmit(outputFormSendSuccessMessageHandler,outputFormSendErrorMessage);
};
const resetState = ()=>{
  moveMainMarker(START_LAT.toFixed(5), START_LNG.toFixed(5));
  setAddress(START_LAT, START_LNG);
  getAddData();
  setupAdForm();
  setupFilterForm();
};
const setFailedState = () => {
  setupAdForm();
  setupFilterForm();
  setupFormInactiveState('ad-form',true);
  setupFormInactiveState('map__filters',true);
};

export { setInitState, setFailedState,resetState };
