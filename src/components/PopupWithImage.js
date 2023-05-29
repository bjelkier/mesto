import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  open(text, link) {
    const image = this._popup.querySelector('.image-popup__image');
    const name = this._popup.querySelector('.image-popup__title');
    image.src = link;
    image.alt = text;
    name.textContent = text;

    super.open();
  }
}
