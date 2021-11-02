import { getHouseTypeStringValue } from './util.js';

const card = document.querySelector('#card').content;
export const renderPopup = (data) => {
  const cardTemplate = card.cloneNode(true);
  const offer = data.offer;
  //Выведите заголовок объявления offer.title в заголовок .popup__title
  const popupTitle = cardTemplate.querySelector('.popup__title');
  popupTitle.textContent = offer.title;
  //Выведите адрес offer.address в блок .popup__text--address.
  const popupAddress = cardTemplate.querySelector('.popup__text--address');
  popupAddress.textContent = offer.address;
  //Выведите цену offer.price в блок .popup__text--price
  //строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
  const popupPrice = cardTemplate.querySelector('.popup__text--price');
  popupPrice.textContent = `${offer.price} ₽/ночь`;
  /**
     * В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
      Квартира для flat
      Бунгало для bungalow
      Дом для house
      Дворец для palace
      Отель для hotel
     */
  const popupType = cardTemplate.querySelector('.popup__type');
  popupType.textContent = getHouseTypeStringValue(offer.type);
  /**
     * Выведите количество гостей и комнат offer.rooms и offer.guests в
     *  блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
    */
  const popupCapacity = cardTemplate.querySelector('.popup__text--capacity');
  popupCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  /**
     * Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида
     *  Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
     */
  const popupTime = cardTemplate.querySelector('.popup__text--time');
  popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  /**
     * В список .popup__features выведите все доступные удобства в объявлении.
     */
  const popupFeaturesContainer = cardTemplate.querySelector('.popup__features');
  const popupFeatures = popupFeaturesContainer.querySelectorAll('.popup__feature');
  const features = offer.features;
  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  popupFeatures.forEach((feature) => {
    const modifier = feature.classList[1];
    if (!modifiers.includes(modifier)) {
      feature.remove();
    }
  });
  /**
     * В блок .popup__description выведите описание объекта недвижимости offer.description
     */
  const popupDescription = cardTemplate.querySelector('.popup__description');
  popupDescription.textContent = offer.description;
  /**
     * В блок .popup__photos выведите все фотографии из списка offer.photos.
     *  Каждая из строк массива photos должна записываться как атрибут
     * src соответствующего изображения.
     */
  const popupPhotosContainer = cardTemplate.querySelector('.popup__photos');
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
  //Замените значение атрибута src у аватарки пользователя
  // .popup__avatar на значение поля author.avatar.
  const popupAvatar = cardTemplate.querySelector('.popup__avatar');
  popupAvatar.innerHTML = '';
  popupAvatar.src = data.author.avatar;
  popupAvatar.classList.add('popup__avatar');
  popupAvatar.style.width = '70px';
  popupAvatar.style.height = '70px';
  popupAvatar.alt = 'Аватар пользователя';
  return cardTemplate;
};
