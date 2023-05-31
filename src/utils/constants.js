export const cardTemplate = document.querySelector('#places__card');
export const cardContainer = document.querySelector('.places__gallery');
export const imagePopup = document.querySelector('.image-popup');
export const imagePopupImage = imagePopup.querySelector('.image-popup__image');
export const imagePopupTitle = imagePopup.querySelector('.image-popup__title');
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const setPicButton = document.querySelector('.profile__userpic-button');
export const userName = document.querySelector('.profile__name');
export const userDescription = document.querySelector('.profile__description');
export const userPopup = document.querySelector('.user-popup');
export const userpicPopup = document.querySelector('.userpic-popup');
export const profilePopupForm = document.querySelector('.popup__form');
export const placePopup = document.querySelector('.place-popup');
export const placeForm = document.querySelector('.popup__form[name="edit-place"]');
export const addName = profilePopupForm.querySelector('.popup__input_name-input');
export const addDescription = profilePopupForm.querySelector('.popup__input_about-input');
export const ESC_KEYCODE = 27;
export let numCardsAddedFromForm = 0;

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
  inputVisibleError: 'popup__input-error_active',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
};

export const initialCards = [
  {
    name: 'Выборг',
    link: 'https://i.ibb.co/fdvY68v/IMG-8396.jpg'
  },
  {
    name: 'Казань',
    link: 'https://i.ibb.co/BTYGd05/IMG-4934.jpg'
  },
  {
    name: 'Ладожское озеро',
    link: 'https://i.ibb.co/j67VNp7/IMG-6876.jpg'
  },
  {
    name: 'Сестрорецк',
    link: 'https://i.ibb.co/GtCkLT7/IMG-5488.jpg'
  },
  {
    name: 'Тула',
    link: 'https://i.ibb.co/GPJrTL4/IMG-4973-2.jpg'
  },
  {
    name: 'Мурманск',
    link: 'https://i.ibb.co/N26d5XV/IMG-8645.jpg'
  }
];

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp);
  // popup.addEventListener('mousedown', handleOverlayClose);
}

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscUp);
  // popup.removeEventListener('mousedown', handleOverlayClose);
}

export const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closePopup)
}

export const isEscEvent = (evt, action) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.which === ESC_KEYCODE) {
    action(openedPopup);
  }
}

// export const handleOverlayClose = (evt) => {
//   if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
//     closePopup(evt.target);
//   }
// }

// closeButtons.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closePopup(popup));
// });

// placeForm.addEventListener('submit', handlePlaceFormSubmit);

// import { handlePlaceFormSubmit } from "../pages/index.js";
