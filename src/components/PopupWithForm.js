import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ overlays, handleFormSubmit }) {
    super(overlays);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._formSelector.querySelectorAll('.popup__input');

    const formValues = {};
    this._inputList.forEach(input => {
      const value = input.value;
      const name = input.name;
      formValues[name] = value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup();
    this._formSelector.reset();
  }
}
