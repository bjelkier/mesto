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

function deleteCard(event) {
  const deleteButton = event.target.closest('.places__delete-button');
  if (deleteButton) {
    const cardElement = deleteButton.closest('.places__card');
    cardElement.remove();
  }
}

initialCards.forEach((card) => {
  const cardElement = cardTemplate.content.querySelector('.places__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.places__image');
  const cardPlace = cardElement.querySelector('.places__place');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardPlace.textContent = card.name;
  cardContainer.appendChild(cardElement);
});

cardContainer.addEventListener('click', deleteCard);


const editButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('.profile__add-button');

let userName = document.querySelector('.profile__name');

let userDescription = document.querySelector('.profile__description');

const popup = document.querySelector('.popup');

let closeButton = document.querySelector('.popup__close-button');

const popupForm = document.querySelector('.popup__form');

let addName = popupForm.querySelector('.popup__field_input_name');

let addDescription = popupForm.querySelector('.popup__field_input_description');

function openPopup() {
  popup.classList.add('popup_opened');
  addName.value = userName.textContent;
  addDescription.value = userDescription.textContent;
};

function closePopup() {
  popup.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = addName.value;
  userDescription.textContent = addDescription.value;
  closePopup();
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleFormSubmit);


const addPlaceButton = document.querySelector('.profile__add-button');
const placePopup = document.querySelector('.place-popup');
const closePlacePopupButton = placePopup.querySelector('.popup__close-button');
const placesGallery = document.querySelector('.places__gallery');
const placeForm = document.querySelector('.popup__form[name="edit-place"]');

function openPlacePopup() {
  placeForm.reset();
  placePopup.classList.add('popup_opened');
}

function closePlacePopup() {
  placePopup.classList.remove('popup_opened');
}

function handlePlaceFormSubmit(event) {
  event.preventDefault();
  const cardName = event.target.elements['destination-field'].value;
  const cardImage = event.target.elements['url-field'].value;
  const cardTemplate = document.querySelector('#places__card');
  const newCard = cardTemplate.content.cloneNode(true);
  newCard.querySelector('.places__place').textContent = cardName;
  newCard.querySelector('.places__image').setAttribute('src', cardImage);
  placesGallery.prepend(newCard);
  closePlacePopup();
}

addPlaceButton.addEventListener('click', openPlacePopup);
closePlacePopupButton.addEventListener('click', closePlacePopup);
placeForm.addEventListener('submit', handlePlaceFormSubmit);


placesGallery.addEventListener('click', (event) => {
  if (event.target.classList.contains('places__like')) {
    event.target.classList.toggle('places__like_active');
  }
});

const placesCards = document.querySelectorAll('.places__card');

const imagePopup = document.querySelector('.image-popup');

const popupImage = imagePopup.querySelector('.image-popup__image');

const popupTitle = imagePopup.querySelector('.image-popup__title');

function openImagePopup(imgSrc, titleText) {
  const popupCloseButton = imagePopup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', closeImagePopup);
  popupImage.src = imgSrc;
  popupTitle.textContent = titleText;
  imagePopup.classList.add('popup_opened');
}

function closeImagePopup() {
  const popupCloseButton = imagePopup.querySelector('.popup__close-button');
  popupCloseButton.removeEventListener('click', closeImagePopup);
  imagePopup.classList.remove('popup_opened');
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('places__image')) {
    const image = event.target;
    const card = image.closest('.places__card');
    const title = card.querySelector('.places__place').textContent;
    openImagePopup(image.src, title);
  }
});