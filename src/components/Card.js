import { Popup } from './Popup.js';

import { cardTemplate, imagePopup, imagePopupImage, imagePopupTitle, openPopup } from '../utils/constants.js'

export class Card {
  constructor(initialCards, cardTemplate, handleClick) {
    this._link = initialCards.link;
    this._name = initialCards.name;
    this._cardTemplate = cardTemplate;
    this._handleClick = handleClick;
    this._element = undefined;
    this._likeButton = null;
    this._deleteButton = null;
    this._imagePopupImage = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .firstElementChild
      .cloneNode(true);

    return cardElement;
  }

  _handleLike() {
    this._likeButton.classList.toggle('places__like_active');
  }

  _handleDelete() {
    if (this._element) {
      this._element.remove();
    }
  }

  _handlePopupClick() {
    imagePopupImage.src = this._link;
    imagePopupImage.alt = this._name;
    openPopup(imagePopup);
    imagePopupTitle.textContent = this._name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDelete();
    });

    this._imagePopupImage.addEventListener('click', () => {
      this._handlePopupClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._imagePopupImage = this._element.querySelector('.places__image');
    this._imagePopupImage.src = this._link;
    this._imagePopupImage.alt = this._name;
    this._element.querySelector('.places__place').textContent = this._name;
    this._likeButton = this._element.querySelector('.places__like');
    this._deleteButton = this._element.querySelector('.places__delete-button');

    this._setEventListeners();

    return this._element;
  }
}
