const editButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('profile__add-button');

let userName = document.querySelector('.profile__name');

let userDescription = document.querySelector('.profile__description');

const popup = document.querySelector('.popup');

const popupContainer = document.querySelector('.popup__container')

const closeButton = document.querySelector('.popup__close-button');

let addName = popupContainer.querySelector('.popup__field_input_name');

let addDescription = popupContainer.querySelector('.popup__field_input_description');

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
popupContainer.addEventListener('submit', handleFormSubmit);

