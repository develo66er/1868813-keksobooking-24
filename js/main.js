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

const createRandomAuthor = (avatarNumbersArray) => {

  const author = {};

  const index = getRandomInteger(0, avatarNumbersArray.length - 1);

  const number = avatarNumbersArray.splice(index, 1);

  author.avatar = `img/avatars/user${number}.png`;

  return author;

};

const createType = () => {

  const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

  const typeIndex = getRandomInteger(0, 4);

  return types[typeIndex];

};

const createChecks = () => {

  const checks = ['12:00', '13:00', '14:00'];

  const checkIndex = getRandomInteger(0, 3);

  return checks[checkIndex];

};

const createFeatures = () => {
  const possibleFeaturesValues = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  let possibleFeaturesLength = possibleFeaturesValues.length;

  const resultingFeaturesLength = getRandomInteger(1, 6);

  const features = [];

  for (let index = 0; index < resultingFeaturesLength; index++) {

    const possibleFeatureIndex = getRandomInteger(0, --possibleFeaturesLength);

    features.push(possibleFeaturesValues.splice(possibleFeatureIndex, 1));

  }

  return features;

};

const createPhotoPaths = () => {
  const possiblePhotoPaths = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg'
    , 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg'
    , 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

  let possiblePhotoPathsLength = possiblePhotoPaths.length;

  const resultingPhotoPathsLength = getRandomInteger(1, possiblePhotoPathsLength);

  const photoPaths = [];

  for (let index = 0; index < resultingPhotoPathsLength; index++) {

    const possibleFeatureIndex = getRandomInteger(0, --possiblePhotoPathsLength);

    photoPaths.push(possiblePhotoPaths.splice(possibleFeatureIndex, 1));

  }

  return photoPaths;
};

const createLocation = () => {

  const location = {};

  location.lat = getRandomFloat(35.65, 35.70);

  location.lng = getRandomFloat(139.70, 139.80);

  return location;

};

const createOffer = (maxPrice, maxRoomsNumber, maxGuestsNumber) => {

  const offer = {};

  offer.title = 'Очень заманчивое предложение';

  offer.address = '{{location.lat}}, {{location.lng}}';

  offer.price = getRandomInteger(0, maxPrice);

  offer.type = createType();

  offer.rooms = getRandomInteger(0, maxRoomsNumber);

  offer.guests = getRandomInteger(0, maxGuestsNumber);

  offer.checkin = createChecks();

  offer.checkout = createChecks();

  offer.features = createFeatures();

  offer.description = 'Свобода, равенство, братство - 3 в одном!';

  offer.photos = createPhotoPaths();

  return offer;

};

/* отладочная функция, eslinter ругается на console

const outputData = (index, data) => {

  console.log(`data [${index}]\n`);

  console.log(data.author);

  console.log(data.offer);

  сonsole.log('photos:\n');

  console.log(data.offer.photos);

  console.log('features:\n');

  console.log(data.offer.features);


  console.log(data.location);

};
*/

const createData = () => {

  const avatarNumbersArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

  const data = [];

  for (let index = 0; index < 10; index++) {

    data[index] = {};

    data[index].author = createRandomAuthor(avatarNumbersArray);

    data[index].offer = createOffer(1000, 100, 100);

    data[index].location = createLocation();

    //вызов отладочной функцииб раскомментировать вызов и функцию при отладке

    //outputData(index,data[index]);

  }

  return data;

};

createData();

