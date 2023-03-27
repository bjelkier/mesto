const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  errorSelector: '.popup__input-error_type_',
  buttonDisabledClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_input_error',
  errorClass: 'popup__input-error_visible',
  formErrorClass: 'popup__form_invalid'
};

function enableValidation(formValidationConfig) {
  const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));
  formList.forEach(form => {
    const inputList = Array.from(form.querySelectorAll(formValidationConfig.inputSelector));
    const buttonSubmit = form.querySelector(formValidationConfig.submitButtonSelector);
    setEventListener(form, inputList, buttonSubmit, formValidationConfig);

  })
}

function toggleButtonState(inputList, buttonSubmit, buttonDisabledClass) {
  const isFormValid = inputList.every(inputElement => inputElement.validity.valid);
  buttonSubmit.disabled = !isFormValid;
  if (isFormValid) {
    buttonSubmit.classList.remove(buttonDisabledClass);
  } else {
    buttonSubmit.classList.add(buttonDisabledClass);
  }
}

function setEventListener(form, inputList, buttonSubmit, formValidationConfig) {
  function toggleButtonState() {
    const isFormValid = inputList.every(inputElement => inputElement.validity.valid);
    buttonSubmit.disabled = !isFormValid;
    if (isFormValid) {
      buttonSubmit.classList.remove(formValidationConfig.buttonDisabledClass);
    } else {
      buttonSubmit.classList.add(formValidationConfig.buttonDisabledClass);
    }
  }

  toggleButtonState();

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      toggleButtonState();
      isInputValidity(inputElement, form, formValidationConfig);
    });
  });

  form.addEventListener('reset', function () {
    buttonSubmit.disabled = true;
    buttonSubmit.classList.add(formValidationConfig.buttonDisabledClass);
    inputList.forEach(inputElement => {
      isInputValidity(inputElement, form, formValidationConfig);
    });
  });
}

function isInputValidity(input, form, formValidationConfig) {
  const error = form.querySelector(`${formValidationConfig.errorSelector}${input.name}`);
  if (input.validity.valid) {
    hideErrorInput(input, form, formValidationConfig);
  } else {
    displayErrorInput(input, form, formValidationConfig, error);
  }
}

function displayErrorInput(input, form, formValidationConfig) {
  const error = form.querySelector(`${formValidationConfig.errorSelector}${input.name}`);
  input.classList.add(formValidationConfig.inputErrorClass);
  error.textContent = input.validationMessage;
  error.classList.add(formValidationConfig.errorClass);
  form.classList.add(formValidationConfig.formErrorClass);
}

function hideErrorInput(input, form, formValidationConfig) {
  const error = form.querySelector(`${formValidationConfig.errorSelector}${input.name}`);
  input.classList.remove(formValidationConfig.inputErrorClass);
  error.textContent = ' ';
  error.classList.remove(formValidationConfig.errorClass);
  form.classList.remove(formValidationConfig.formErrorClass);
}

function inputValid(inputList) {
  return inputList.every(input => input.validity.valid);
}

enableValidation(formValidationConfig);