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

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openUserPopup(userPopup) {
  openPopup(userPopup);
  addName.value = userName.textContent;
  addDescription.value = userDescription.textContent;
}

function openPlacePopup() {
  placeForm.reset();
  openPopup(placePopup);
}

new PopupWithImage(imagePopup);

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

const newImagePopup = new PopupWithImage(imagePopup);

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

addButton.addEventListener('click', openPlacePopup);

placeForm.addEventListener('submit', handlePlaceFormSubmit);

editButton.addEventListener('click', function () {
  openUserPopup(userPopup);
});

profilePopupForm.addEventListener('submit', handleProfilePopupFormSubmit);
