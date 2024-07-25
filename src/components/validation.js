const regexValidation = /^[a-zA-Zа-яА-ЯёЁ -]+$/;
const regexValidationUrl = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-\.]*)*\/?(\?[;&a-z\d%_.~+=-]*)?(#[\w\-]*)?$/i;

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidityUrl = (formElement, inputElement, validationConfig) => {
  const errorMessage = (!regexValidationUrl.test(inputElement.value) && inputElement.value) ?
    inputElement.dataset.errorMessage :
    inputElement.validationMessage;

  if (!regexValidationUrl.test(inputElement.value) || !inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  const errorMessage = (!regexValidation.test(inputElement.value) && inputElement.value) ?
    inputElement.dataset.errorMessage :
    inputElement.validationMessage;

  if (!regexValidation.test(inputElement.value) || !inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    if (!inputElement.classList.contains('popup__input_type_url')) {
      return !(regexValidation.test(inputElement.value) && inputElement.validity.valid);
    } else {
      return !(regexValidationUrl.test(inputElement.value) && inputElement.validity.valid);
    }
  });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

export function clearValidation(profileForm, validationConfig) {
  const popupInputElemets = profileForm.querySelectorAll(validationConfig.inputSelector);
  const popupButton = profileForm.querySelector(validationConfig.submitButtonSelector)
  popupInputElemets.forEach(input => {
    hideInputError(profileForm, input, validationConfig);
  });
  popupButton.classList.add(validationConfig.inactiveButtonClass);
  popupButton.disabled = true;
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    // If not link, regular validation
    if (!inputElement.classList.contains('popup__input_type_url')) {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    } else {
      inputElement.addEventListener('input', function () {
        checkInputValidityUrl(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    }
  });
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};