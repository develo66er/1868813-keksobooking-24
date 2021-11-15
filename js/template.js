import { getHouseTypeStringValue } from './util.js';

const card = document.querySelector('#card').content;
export const renderPopup = (data) => {
  const cardTemplate = card.cloneNode(true);
  const offer = data.offer;
  //Выведите заголовок объявления offer.title в заголовок .popup__title
  const popupTitle = cardTemplate.querySelector('.popup__title');
  if (offer.title) {
    popupTitle.textContent = offer.title;
  } else {
    popupTitle.classList.add('hidden');
  }
  //Выведите адрес offer.address в блок .popup__text--address.
  const popupAddress = cardTemplate.querySelector('.popup__text--address');
  if (offer.address) {
    popupAddress.textContent = offer.address;
  } else {
    popupAddress.classList.add('hidden');
  }
  //Выведите цену offer.price в блок .popup__text--price
  //строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
  const popupPrice = cardTemplate.querySelector('.popup__text--price');
  if (offer.price) {
    popupPrice.textContent = `${offer.price} ₽/ночь`;
  } else {
    popupPrice.classList.add('hidden');
  }
  /**
      * В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
       Квартира для flat
       Бунгало для bungalow
       Дом для house
       Дворец для palace
       Отель для hotel
      */
  const popupType = cardTemplate.querySelector('.popup__type');
  if (offer.type) {
    popupType.textContent = getHouseTypeStringValue(offer.type);
  } else {
    popupType.classList.add('hidden');
  }
  /**
      * Выведите количество гостей и комнат offer.rooms и offer.guests в
      *  блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
     */
  const popupCapacity = cardTemplate.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    popupCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else if (offer.rooms) {
    popupCapacity.textContent = `${offer.rooms} комнаты`;
  } else if (offer.guests) {
    popupCapacity.textContent = `Для ${offer.guests} гостей`;
  } else {
    popupCapacity.classList.add('hidden');
  }
  /**
      * Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида
      *  Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
      */
  const popupTime = cardTemplate.querySelector('.popup__text--time');
  if (offer.checkin && offer.checkout) {
    popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else if (offer.checkin) {
    popupTime.textContent = `Заезд после ${offer.checkin}`;
  } else if (offer.checkout) {
    popupTime.textContent = `Выезд до ${offer.checkout}`;
  } else {
    popupTime.classList.add('hidden');
  }
  /**
      * В список .popup__features выведите все доступные удобства в объявлении.
      */
  const popupFeaturesContainer = cardTemplate.querySelector('.popup__features');
  const popupFeatures = popupFeaturesContainer.querySelectorAll('.popup__feature');
  if (offer.features && offer.features.lenght !== 0) {
    const features = offer.features;
    const modifiers = features.map((feature) => `popup__feature--${feature}`);
    popupFeatures.forEach((feature) => {
      const modifier = feature.classList[1];
      if (!modifiers.includes(modifier)) {
        feature.remove();
      }
    });
  } else {
    popupFeaturesContainer.classList.add('hidden');
  }
  /**
      * В блок .popup__description выведите описание объекта недвижимости offer.description
      */
  const popupDescription = cardTemplate.querySelector('.popup__description');
  if (offer.description) {
    popupDescription.textContent = offer.description;
  } else {
    popupDescription.classList.add('hidden');
  }
  /**
      * В блок .popup__photos выведите все фотографии из списка offer.photos.
      *  Каждая из строк массива photos должна записываться как атрибут
      * src соответствующего изображения.
      */
  const popupPhotosContainer = cardTemplate.querySelector('.popup__photos');
  if (offer.photos && offer.photos.lenght !== 0) {
    popupPhotosContainer.innerHTML = '';
    offer.photos.forEach((photoUrl) => {
      const photo = document.createElement('img');
      photo.src = photoUrl;
      photo.classList.add('popup__photo');
      photo.style.width = '45px';
      photo.style.height = '40px';
      photo.alt = 'Фотография жилья';
      popupPhotosContainer.appendChild(photo);
    });
  } else {
    popupPhotosContainer.classList.add('hidden');
  }
  //Замените значение атрибута src у аватарки пользователя
  // .popup__avatar на значение поля author.avatar.
  const popupAvatar = cardTemplate.querySelector('.popup__avatar');
  if (data.author && data.author.avatar) {
    popupAvatar.innerHTML = '';
    popupAvatar.src = data.author.avatar;
    popupAvatar.classList.add('popup__avatar');
    popupAvatar.style.width = '70px';
    popupAvatar.style.height = '70px';
    popupAvatar.alt = 'Аватар пользователя';
  } else {
    popupAvatar.classList.add('hidden');
  }
  return cardTemplate;
};
