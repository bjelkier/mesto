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
const addName = profilePopupForm.querySelector('.popup__field_input_name');
const addDescription = profilePopupForm.querySelector('.popup__field_input_description');
let numCardsAddedFromForm = 0;

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

document.addEventListener('keydown', function (event) {
  if (event.code === 'Escape') {
    const openPopups = document.querySelectorAll('.popup_opened');
    if (openPopups.length) {
      closePopup(openPopups[openPopups.length - 1]);
    }
  }
});

const overlays = document.querySelectorAll('.popup');
for (let i = 0; i < overlays.length; i++) {
  overlays[i].addEventListener('click', function (event) {
    if (event.target === this) {
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
    const completeCard = createCard(cardData);
    const cardIndex = initialCards.findIndex((c) => c.name === cardData.name && c.link === cardData.link);

    if (cardIndex >= 0) {
      const indexInCardContainer = cardIndex + numCardsAddedFromForm;
      const existingCard = cardContainer.children[indexInCardContainer];
      cardContainer.insertBefore(completeCard, existingCard);
    } else {
      cardContainer.insertBefore(completeCard, cardContainer.firstChild);
      numCardsAddedFromForm++;
    }
  });
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
  const cardName = event.target.elements['destination-field'].value;
  const cardImage = event.target.elements['url-field'].value;
  const cardData = {
    name: cardName,
    link: cardImage,
  };
  const completeCard = createCard(cardData);
  cardContainer.insertBefore(completeCard, cardContainer.firstChild);
  closePopup(placePopup);
}

addButton.addEventListener('click', openPlacePopup);

placeForm.addEventListener('submit', handlePlaceFormSubmit);

editButton.addEventListener('click', function () {
  openUserPopup(userPopup);
});

profilePopupForm.addEventListener('submit', handleProfilePopupFormSubmit);
