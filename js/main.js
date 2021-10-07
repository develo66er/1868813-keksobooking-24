
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

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

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
    return;
  }

  return Math.floor(Math.random() * (to - from + 1) + from);

};

getRandomInteger(0, 1);

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

getRandomFloat(1.2, 2, 2);

const createRandomAuthor = () => {

  const index = getRandomInteger(0, AVATAR_NUMBERS_ARRAY.length - 1);

  const number = AVATAR_NUMBERS_ARRAY.splice(index, 1);

  return {

    avatar: `img/avatars/user${number}.png`,

  };

};

const createType = () => {

  const typesCopy = TYPES.slice();

  const typeIndex = getRandomInteger(0, 4);

  return typesCopy[typeIndex];

};

const createChecks = () => {

  const checksCopy = CHECKS.slice();

  const checkIndex = getRandomInteger(0, checksCopy.length-1);

  return checksCopy[checkIndex];

};

const createFeatures = () => {

  const possibleFeaturesValuesCopy = POSSIBLE_FEATURE_VALUES.slice();

  let possibleFeaturesLength = possibleFeaturesValuesCopy.length;

  const resultingFeaturesLength = getRandomInteger(1, 6);

  const features = [];

  for (let index = 0; index < resultingFeaturesLength; index++) {

    const possibleFeatureIndex = getRandomInteger(0, --possibleFeaturesLength);

    features.push(possibleFeaturesValuesCopy.splice(possibleFeatureIndex, 1));

  }

  return features;

};

const createPhotoPaths = () => {

  const possiblePhotoPathsCopy = POSSIBLE_PHOTO_PATHS.slice();

  let possiblePhotoPathsLength = possiblePhotoPathsCopy.length;

  const resultingPhotoPathsLength = getRandomInteger(1, possiblePhotoPathsLength);

  const photoPaths = [];

  for (let index = 0; index < resultingPhotoPathsLength; index++) {

    const possibleFeatureIndex = getRandomInteger(0, --possiblePhotoPathsLength);

    photoPaths.push(possiblePhotoPathsCopy.splice(possibleFeatureIndex, 1));

  }

  return photoPaths;

};


const createTitle = () => {

  const titleIndex = getRandomInteger(0, TITLES_ARRAY.length - 1);

  return `${TITLES_ARRAY[titleIndex]}`;

};

const createDescription = () => {

  const descriptionsArrayCopy = DESCRIPTIONS_ARRAY.slice();

  let descriptionsArrayLenght = descriptionsArrayCopy.length;

  const itemsNumber = getRandomInteger(0, descriptionsArrayCopy.length - 1);

  const descriptions = [];

  for (let index = 0; index < itemsNumber; index++) {

    const itemIndex = getRandomInteger(0, --descriptionsArrayLenght);

    descriptions.push(descriptionsArrayCopy.splice(itemIndex, 1));

  }

  return descriptions.join(', ');

};

const createOfferForLocation = (location) => {

  const offerTitle = createTitle();

  return {

    title: offerTitle,

    address: `${location.lat},${location.lng}`,

    price: getRandomInteger(0, MAX_PRICE),

    type: createType(),

    rooms: getRandomInteger(0, MAX_ROOMS_NUMBER),

    guests: getRandomInteger(0, MAX_GUESTS_NUMBER),

    checkin: createChecks(),

    checkout: createChecks(),

    features: createFeatures(),

    description: `${offerTitle} : ${createDescription()}`,

    photos: createPhotoPaths(),

  };

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

  for (let index = 0; index < 10; index++) {

    const userLocation = {

      lat: getRandomFloat(35.65, 35.70, 2),

      lng: getRandomFloat(139.70, 139.80, 2),

    };

    offers.push({

      author: createRandomAuthor(),

      offer: createOfferForLocation(userLocation),

      location: userLocation,

    });

    //вызов отладочной функцииб раскомментировать вызов и функцию при отладке

    //outputData(index, offers[index]);

  }

  return offers;

};

createOffers();

