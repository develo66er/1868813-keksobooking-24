
const MAX_PRICE = 1000;

const MAX_GUESTS_NUMBER = 100;

const MAX_ROOMS_NUMBER = 100;

const TITLES_ARRAY = ['классная квартирка', 'шикарная квартирка в центре',
  'просторная квартира', '1 комнатная квартира',
  'квартира- студия', 'просторный домик',
  'дом почти даром', 'дом с видом на парк', 'двухэтажный дом',
  'отель мечты', 'шикарный дворец',
  'удобное бунгало', 'вип отель'];

const DESCRIPTIONS_ARRAY = ['по выгодной цене',
  'красивый вид из окна', 'удобная и развитая инфраструктура',
  'рядом поликлиника, детский сад и школа', 'хорошие соседи',
  'рядом детская площадка и бассейн', 'спокойный район', 'чистый двор'];

const AVATAR_NUMBERS_ARRAY = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

const TITLES_TO_TYPES_MAP = new Map([['классная квартирка', 'flat'], ['шикарная квартирка в центре', 'flat'],
['просторная квартира', 'flat'], ['1 комнатная квартира', 'flat'],
['квартира- студия', 'flat'], ['просторный домик', 'house'],
['дом почти даром', 'house'], ['дом с видом на парк', 'house'], ['двухэтажный дом', 'house'],
['отель мечты', 'hotel'], ['шикарный дворец', 'palace'],
['удобное бунгало', 'bungalow'], ['вип отель', 'hotel']]);

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
    throw new Error('Начальное значение диапазона не может быть больше конечного');
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

  shuffle(AVATAR_NUMBERS_ARRAY);

  for (let index = 0; index < AVATAR_NUMBERS_ARRAY.length; index++) {

    const userLocation = {
      lat: getRandomFloat(35.65, 35.70, 2),
      lng: getRandomFloat(139.70, 139.80, 2),
    };
    const offerTitle = getRandomArrayItem(TITLES_ARRAY);
    offers.push({
      author: {
        avatar: `img/avatars/user${AVATAR_NUMBERS_ARRAY[index]}.png`,
      },
      offer: {
        title: offerTitle,
        address: `${userLocation.lat},${userLocation.lng}`,
        price: getRandomInteger(0, MAX_PRICE),
        type: TITLES_TO_TYPES_MAP.get(offerTitle),
        rooms: getRandomInteger(0, MAX_ROOMS_NUMBER),
        guests: getRandomInteger(0, MAX_GUESTS_NUMBER),
        checkin: getRandomArrayItem(CHECKS),
        checkout: getRandomArrayItem(CHECKS),
        features: getArrayOfRandomLength(POSSIBLE_FEATURE_VALUES),
        description: `${offerTitle} : ${getArrayOfRandomLength(DESCRIPTIONS_ARRAY)}`,
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
