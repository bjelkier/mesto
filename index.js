const editButton = document.querySelector('.profile__edit-button');
console.log(editButton)

const addButton = document.querySelector('profile__add-button');
console.log(addButton)

let like = document.querySelector('.like');
console.log(like)

function onClick(like) {
  like.className = "like_liked";
};

let userName = document.querySelector('.profile__name');
console.log(userName)

let userDescription = document.querySelector('.profile__description');
console.log(userDescription)

const popup = document.querySelector('.popup');
console.log(popup)

const popupContainer = document.querySelector('.popup__container')
console.log(popupContainer)

const closeButton = document.querySelector('.popup__close-button');
console.log(closeButton)

let addName = popupContainer.querySelector('.popup__name-field_input');

let addDescription = popupContainer.querySelector('.popup__description-field_input');

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
like.addEventListener('click', onClick);

