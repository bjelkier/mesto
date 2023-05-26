import { overlays } from '../utils/constants.js';

export class Popup {
  constructor(overlays) {
    this._popup = overlays;
    this._closeByEsc = this._closeByEsc.bind(this);
  }

  _closeByEsc(evt) {
    evt.preventDefault();
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        this.closePopup();
      }
    });
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEsc);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEsc);
  }
}
