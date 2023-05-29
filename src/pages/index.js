import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import { initialCards, validationConfig, userPopup, placePopup, addButton, editButton, addName, addDescription } from '../utils/constants.js'

new FormValidator(validationConfig, userPopup);
new FormValidator(validationConfig, placePopup);

const createCard = (data) => {
  const card = new Card(data, '#places__card', () => {
    picPopup.open(data.name, data.link)
  });
  return card.generateCard();
}

const renderCard = (data, wrap) => {
  const card = createCard(data);
  wrap.append(card);
}

const handleProfilePopupFormSubmit = (data) => {
  const { name, about } = data
  userInfo.setUserInfo(name, about)
  editProfilePopup.close()
}

const handlePlaceFormSubmit = (data) => {
  const card = createCard({
    name: data['destination-input'],
    link: data['url-input']
  })

  section.addItem(card)
  addCardPopup.close()
}

editButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo()
  addName.value = name
  addDescription.value = job
  editProfilePopup.open()
});

addButton.addEventListener('click', () => {
  addCardPopup.open()
});

const section = new Section({ items: initialCards, renderer: renderCard }, 'places__gallery')
const picPopup = new PopupWithImage('.image-popup')
const addCardPopup = new PopupWithForm('.place-popup', handlePlaceFormSubmit)
const editProfilePopup = new PopupWithForm('.user-popup', handleProfilePopupFormSubmit)

picPopup.setEventListeners()
addCardPopup.setEventListeners()
editProfilePopup.setEventListeners()

section.renderItems()

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userDescriptionSelector: '.profile__description' })
