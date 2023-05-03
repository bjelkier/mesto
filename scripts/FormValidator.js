export class FormValidator {
  constructor(validationConfig, formSelector) {
    this.validationConfig = validationConfig;
    this.formElement = document.querySelector(formSelector);
    this.formInputsList = Array.from(this.formElement.querySelectorAll(this.validationConfig.inputSelector));
    this.buttonElement = this.formElement.querySelector(this.validationConfig.submitButtonSelector);
    this._setEventListeners();
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.validationConfig.inputVisibleError);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.validationConfig.inputErrorClass);
    errorElement.classList.remove(this.validationConfig.inputVisibleError);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this.validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this.validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  _setEventListeners() {
    const forms = Array.from(document.querySelectorAll(this.validationConfig.formSelector));
    forms.forEach(form => {
      const inputList = Array.from(form.querySelectorAll(this.validationConfig.inputSelector));
      const buttonElement = form.querySelector(this.validationConfig.submitButtonSelector);
      form.addEventListener('reset', () => {
        this._disableButton(buttonElement);
      });
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(form, inputElement);
          if (this._hasInvalidInput(inputList)) {
            this._disableButton(buttonElement);
          } else {
            this._enableButton(buttonElement);
          }
        });
      });
    });
  }
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
  inputVisibleError: 'popup__input-error_active',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
};

const formValidator = new FormValidator(validationConfig, validationConfig.formSelector);