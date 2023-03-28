import {
  initialCards
} from './initialCardsArray.js';

const cardTemplate = document.querySelector('#places__card');
const cardContainer = document.querySelector('.places__gallery');
const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');
const closeButtons = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const userPopup = document.querySelector('.user-popup');
const profilePopupForm = document.querySelector('.popup__form');
const placePopup = document.querySelector('.place-popup');
const placeForm = document.querySelector('.popup__form[name="edit-place"]');
const addName = profilePopupForm.querySelector('.popup__input_name-input');
const addDescription = profilePopupForm.querySelector('.popup__input_about-input');
let numCardsAddedFromForm = 0;

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

const overlays = document.querySelectorAll('.popup');
for (let i = 0; i < overlays.length; i++) {
  overlays[i].addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      closePopup(this);
    }
  });
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function createCard(cardData) {
  const cardElement = cardTemplate.content.querySelector('.places__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.places__image');
  const cardPlace = cardElement.querySelector('.places__place');
  const deleteButton = cardElement.querySelector('.places__delete-button');
  const likeButton = cardElement.querySelector('.places__like');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardPlace.textContent = cardData.name;

  cardImage.addEventListener('click', () => {
    openPopup(imagePopup);
    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupTitle.textContent = cardData.name;
  });

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('places__like_active');
  });

  return cardElement;
}

function displayInitialCards() {
  initialCards.forEach((cardData) => {
    cardContainer.append(createCard(cardData));
  })
}

displayInitialCards();

function openUserPopup(userPopup) {
  openPopup(userPopup);
  addName.value = userName.textContent;
  addDescription.value = userDescription.textContent;
}

function handleProfilePopupFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = addName.value;
  userDescription.textContent = addDescription.value;
  closePopup(userPopup);
}

function openPlacePopup() {
  placeForm.reset();
  openPopup(placePopup);
}

function handlePlaceFormSubmit(event) {
  event.preventDefault();
  const cardName = event.target.elements['destination-input'].value;
  const cardImage = event.target.elements['url-input'].value;
  const cardData = {
    name: cardName,
    link: cardImage,
  };
  const completeCard = createCard(cardData);
  cardContainer.prepend(completeCard);
  closePopup(placePopup);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

addButton.addEventListener('click', openPlacePopup);

placeForm.addEventListener('submit', handlePlaceFormSubmit);

editButton.addEventListener('click', function () {
  openUserPopup(userPopup);
});

profilePopupForm.addEventListener('submit', handleProfilePopupFormSubmit);
