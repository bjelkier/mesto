import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ overlays, handleFormSubmit, popupSelector }) {
    super(overlays);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popup.querySelector('.popup__form');
    this._popupSelector = popupSelector;
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
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.closePopup();
    });
    super.setEventListeners();
  }

  closePopup() {
    super.closePopup();
    this._formSelector.reset();
  }
}
