import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(overlays) {
    super(overlays);
    this._name = this._popup.querySelector('.image-popup');
    this._image = this._popup.querySelector('.image-popup__image');
  }
  openPopup(name, link) {
    super.openPopup();
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
  }
}

const imagePopup = document.querySelector('.image-popup');
