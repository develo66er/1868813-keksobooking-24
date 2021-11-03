import {getArrayOfRandomLength,getRandomArrayItem,getRandomFloat,getRandomInteger,shuffle} from './util.js';

import {HouseTypes} from './house-types.js';

export const MAX_PRICE = 1000;

export const MAX_GUESTS_NUMBER = 100;

export const MAX_ROOMS_NUMBER = 100;

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

export const createOffers = () => {

  const offers = [];

  const avatarNumbersCopy = AVATAR_NUMBERS.slice();

  shuffle(avatarNumbersCopy);

  for (let index = 0; index < avatarNumbersCopy.length; index++) {

    const userLocation = {
      lat: getRandomFloat(35.65, 35.70, 2),
      lng: getRandomFloat(139.70, 139.80, 2),
    };
    const offerTitle = getRandomArrayItem(TITLES);
    offers.push({
      author: {
        avatar: `img/avatars/user${avatarNumbersCopy[index]}.png`,
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
  }

  return offers;

};
