const initialCards = [
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

const cardTemplate = document.querySelector('#places__card');
const cardContainer = document.querySelector('.places__gallery');
const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');
const userPopup = document.querySelector('.user-popup');
const universalPopupForm = document.querySelector('.popup__form');
const placePopup = document.querySelector('.place-popup');
const placeForm = document.querySelector('.popup__form[name="edit-place"]');
let addName = universalPopupForm.querySelector('.popup__field_input_name');
let addDescription = universalPopupForm.querySelector('.popup__field_input_description');
let numCardsAddedFromForm = 0;

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
  const cardIndex = initialCards.findIndex((c) => c.name === cardData.name && c.link === cardData.link);

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

  if (cardIndex >= 0) {
    const indexInCardContainer = cardIndex + numCardsAddedFromForm;
    const existingCard = cardContainer.children[indexInCardContainer];
    cardContainer.insertBefore(cardElement, existingCard);
  } else {
    cardContainer.insertBefore(cardElement, cardContainer.firstChild);
    numCardsAddedFromForm++;
  }
}

initialCards.forEach(cardData => {
  createCard(cardData);
});

function openUserPopup(userPopup) {
  openPopup(userPopup);
  addName.value = userName.textContent;
  addDescription.value = userDescription.textContent;
}

function handleUniversalPopupFormSubmit(evt) {
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
  createCard(cardData);
  closePopup(placePopup);
}

addButton.addEventListener('click', openPlacePopup);

placeForm.addEventListener('submit', handlePlaceFormSubmit);

editButton.addEventListener('click', function () {
  openUserPopup(userPopup);
});

universalPopupForm.addEventListener('submit', handleUniversalPopupFormSubmit);
