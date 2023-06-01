import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import { initialCards, validationConfig, userPopup, placePopup, userpicPopup, addButton, editButton, setPicButton, addName, addDescription } from '../utils/constants.js'

import { api } from '../components/Api.js'

let userId;


new FormValidator(validationConfig, userPopup);
new FormValidator(validationConfig, placePopup);
new FormValidator(validationConfig, userpicPopup);

const createCard = (data) => {
  const card = new Card(
    data,
    '#places__card',
    () => {
      picPopup.open(data.name, data.link)
    },
    (id) => {
      confirmationPopup.open()
      confirmationPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(res => {
            card.deleteCard()
          })
          .catch(err => console.log(`Ошибка.....: ${err}`))
          .finally(() => confirmationPopup.close());
      })
    },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
          .catch(err => console.log(`Ошибка.....: ${err}`))
      } else {
        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
          .catch(err => console.log(`Ошибка.....: ${err}`))
      }
    },
  );
  return card.generateCard();
}

const renderCard = (data, wrap) => {
  const card = createCard(data);
  section.addItem(card);
}

const handleProfilePopupFormSubmit = (data) => {
  const { name, about } = data

  api.editProfile(name, about)
    .then(() => {
      userInfo.setUserInfo({ name, about })
      editProfilePopup.close()
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => editProfilePopup.resetSubmitText());
};

function handleUserPicFormSubmit(values) {
  api.updateUserPic(values.avatar)
    .then(res => {
      userInfo.setAvatar(res.avatar);
      userPicPopup.close()
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => userPicPopup.resetSubmitText());
}

const handlePlaceFormSubmit = (data) => {
  api.addCard(data['destination-input'], data['url-input'])
    .then(res => {
      const card = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      })
      section.addItem(card)
      addCardPopup.close()
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => addCardPopup.resetSubmitText());
};

editButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo()
  addName.value = name
  addDescription.value = about
  editProfilePopup.open()
});

addButton.addEventListener('click', () => {
  addCardPopup.open()
});

setPicButton.addEventListener('click', () => {
  userPicPopup.open()
});

const section = new Section({ items: [], renderer: renderCard }, 'places__gallery')
const picPopup = new PopupWithImage('.image-popup')
const addCardPopup = new PopupWithForm('.place-popup', handlePlaceFormSubmit)
const editProfilePopup = new PopupWithForm('.user-popup', handleProfilePopupFormSubmit)
const confirmationPopup = new PopupWithForm('.confirmation-popup')
const userPicPopup = new PopupWithForm('.userpic-popup', handleUserPicFormSubmit)

picPopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
confirmationPopup.setEventListeners();
userPicPopup.setEventListeners();


const userInfo = new UserInfo({ userNameSelector: '.profile__name', userDescriptionSelector: '.profile__description', userPicSelector: '.profile__userpic' })

Promise.all([api.getProfile(), api.getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;

    var cardList = [];

    cards.forEach(data => {
      cardList.unshift({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      })
    });
    userInfo.setUserInfo(userData);
    section.renderItems(cardList);
  })

  .catch(err => console.log(`Ошибка.....: ${err}`));
