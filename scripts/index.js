const editButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('.profile__add-button');

let userName = document.querySelector('.profile__name');

let userDescription = document.querySelector('.profile__description');

const popup = document.querySelector('.popup');

const closeButton = document.querySelector('.popup__close-button');

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

