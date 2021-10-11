const MAX_PRICE = 1000;

const MAX_GUESTS_NUMBER = 100;

const MAX_ROOMS_NUMBER = 100;

const TITLES = ['классная квартирка', 'шикарная квартирка в центре',
  'просторная квартира', '1 комнатная квартира',
  'квартира- студия', 'просторный домик',
  'дом почти даром', 'дом с видом на парк', 'двухэтажный дом',
  'отель мечты', 'шикарный дворец',
  'удобное бунгало', 'вип отель'];

const DESCRIPTIONS = ['по выгодной цене',
  'красивый вид из окна', 'удобная и развитая инфраструктура',
  'рядом поликлиника, детский сад и школа', 'хорошие соседи',
  'рядом детская площадка и бассейн', 'спокойный район', 'чистый двор'];

const AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

const HouseTypes = {
  Flat: 'flat',
  House: 'house',
  Hotel: 'hotel',
  Palace: 'palace',
  Bungalow: 'bungalow',
};

const TITLES_TO_TYPES = new Map([['классная квартирка', HouseTypes.Flat], ['шикарная квартирка в центре', HouseTypes.Flat],
  ['просторная квартира', HouseTypes.Flat], ['1 комнатная квартира', HouseTypes.Flat],
  ['квартира- студия', HouseTypes.Flat], ['просторный домик', HouseTypes.House],
  ['дом почти даром', HouseTypes.House], ['дом с видом на парк', HouseTypes.House],
  ['двухэтажный дом', HouseTypes.House],
  ['отель мечты', HouseTypes.Hotel], ['шикарный дворец', HouseTypes.Palace],
  ['удобное бунгало', HouseTypes.Bungalow], ['вип отель', HouseTypes.Hotel]]);

const CHECKS = ['12:00', '13:00', '14:00'];

const POSSIBLE_FEATURE_VALUES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const POSSIBLE_PHOTO_PATHS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg'
  , 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg'
  , 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


const getRandomInteger = (from, to) => {

  if (from < 0) {
    throw new Error('Начальное значение диапазона не может быть меньше 0');
  }
  if (to < 0) {
    throw new Error('Конечное значение диапазона не может быть меньше 0');
  }

  if (from > to) {
    throw new Error('Начальное значение диапазона не может быть больше конечного');
  }

  if (from === to) {
    throw new Error('Начальное значение диапазона не может быть равно конечному');
  }

  return Math.floor(Math.random() * (to - from + 1) + from);

};

const getRandomFloat = (from, to, decimalPlacesNumber) => {

  if (from < 0) {
    throw new Error('Начальное значение диапазона не может быть меньше 0');
  }

  if (to < 0) {
    throw new Error('Конечное значение диапазона не может быть меньше 0');
  }

  if (from > to) {
    throw new Error('Начальное значение диапазона не может быть больше конечного');
  }

  if (from === to) {
    throw new Error('Начальное значение диапазона не может быть равно конечному');
  }

  const randomFloat = Math.random() * (to - from + 1) + from;

  return parseFloat(randomFloat.toFixed(decimalPlacesNumber));
};

const shuffle = (array) => {

  for (let index = array.length - 1; index > 0; index--) {

    const jindex = Math.floor(Math.random() * (index + 1));

    [array[index], array[jindex]] = [array[jindex], array[index]];
  }

};
const getArrayOfRandomLength = (array) => {

  const localArrayCopy = array.slice();

  const itemsNumber = getRandomInteger(1, localArrayCopy.length);

  shuffle(localArrayCopy);

  return localArrayCopy.splice(0, itemsNumber);

};

const getRandomArrayItem = (array) => {

  const localArrayCopy = array.slice();

  const typeIndex = getRandomInteger(0, localArrayCopy.length - 1);

  return localArrayCopy[typeIndex];

};

// отладочная функция, eslinter ругается на console
/*
const outputData = (index, data) => {
  try {
    console.log(`data [${index}]\n`);
    console.log(data.author);
    console.log(data.offer);
    сonsole.log('photos:\n');
    console.log(data.offer.photos);
    console.log('features:\n');
    console.log(data.offer.features);
    console.log(data.location);
  } catch (error) {
    error.message;
  }
};
*/

const createOffers = () => {

  const offers = [];

  shuffle(AVATAR_NUMBERS);

  for (let index = 0; index < AVATAR_NUMBERS.length; index++) {

    const userLocation = {
      lat: getRandomFloat(35.65, 35.70, 2),
      lng: getRandomFloat(139.70, 139.80, 2),
    };
    const offerTitle = getRandomArrayItem(TITLES);
    offers.push({
      author: {
        avatar: `img/avatars/user${AVATAR_NUMBERS[index]}.png`,
      },
      offer: {
        title: offerTitle,
        address: `${userLocation.lat},${userLocation.lng}`,
        price: getRandomInteger(0, MAX_PRICE),
        type: TITLES_TO_TYPES.get(offerTitle),
        rooms: getRandomInteger(0, MAX_ROOMS_NUMBER),
        guests: getRandomInteger(0, MAX_GUESTS_NUMBER),
        checkin: getRandomArrayItem(CHECKS),
        checkout: getRandomArrayItem(CHECKS),
        features: getArrayOfRandomLength(POSSIBLE_FEATURE_VALUES),
        description: `${offerTitle} : ${getArrayOfRandomLength(DESCRIPTIONS)}`,
        photos: getArrayOfRandomLength(POSSIBLE_PHOTO_PATHS),
      },
      location: userLocation,
    });

    //вызов отладочной функцииб раскомментировать вызов и функцию при отладке

    //outputData(index, offers[index]);

  }

  return offers;

};

createOffers();
