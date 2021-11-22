const START_LAT = 35.68951;
const START_LNG = 139.69171;
const ADD_FORM_INIT_VALUES = new Map([
  ['title', ''],
  ['address', `${START_LAT},${START_LNG}`],
  ['type', 'flat'],
  ['price', ''],
  ['timein', '12:00'],
  ['timeout', '12:00'],
  ['room_number', '1'],
  ['capacity', '1'],
  ['description', ''],
]);
const MAIN_ICON = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  draggable: true,
};

const ICON = {
  url: './img/pin.svg',
  width: 40,
  height: 40,
  draggable: false,
};

export { START_LAT, START_LNG, ADD_FORM_INIT_VALUES, MAIN_ICON, ICON };
