import { Card } from '../components/Card.js';
import { initialCards } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';

import './index.css';

import { Section } from '../components/Section.js'
import { Popup } from '../components/Popup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js'
import { cardContainer, validationConfig, imagePopup, userPopup, profilePopupForm, placePopup, cardTemplate, placeForm, addButton, editButton, closeButtons, addName, addDescription, userName, userDescription, openPopup, closePopup } from '../utils/constants.js';

new FormValidator(validationConfig, userPopup);
new FormValidator(validationConfig, placePopup);

function renderCards(initialCards) {
  const card = new Card(initialCards, '#places__card');
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  cardContainer.append(renderCards(item));
});

const newImagePopup = new PopupWithImage(imagePopup);

const userInfoPopup = new PopupWithForm({
  overlays: profilePopupForm,
  handleFormSubmit: (data) => {
    UserInfo.setUserInfo(data)
  },
  popupSelector: profilePopupForm
});

const newCardPopup = new PopupWithForm({
  overlays: placeForm,
  handleFormSubmit: (cardData) => {
    cardList.addItem(createCard(cardData));
  },
  popupSelector: placeForm
});

function handleProfilePopupFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = addName.value;
  userDescription.textContent = addDescription.value;
  closePopup(userPopup);
}

function handlePlaceFormSubmit(event) {
  event.preventDefault();
  const cardName = event.target.elements['destination-input'].value;
  const cardImage = event.target.elements['url-input'].value;
  const cardData = {
    name: cardName,
    link: cardImage,
  };
  const completeCard = renderCards(cardData);
  cardContainer.prepend(completeCard);
  closePopup(placePopup);
}

addButton.addEventListener('click', () => {
  placeForm.reset();
  openPopup(placePopup);
});

placeForm.addEventListener('submit', handlePlaceFormSubmit);

editButton.addEventListener('click', () => {
  openPopup(userPopup);
  addName.value = userName.textContent;
  addDescription.value = userDescription.textContent;
});

profilePopupForm.addEventListener('submit', handleProfilePopupFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
