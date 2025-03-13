function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!errorElement) {
    console.error(`Error element for ${inputElement.id} not found`);
    return;
  }
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

function checkValidity(formElement, inputElement, inputErrorClass, errorClass) {
  inputElement.validity.patternMismatch
    ? inputElement.setCustomValidity(
        inputElement.dataset.patternMismatchErrorMessage
      )
    : inputElement.setCustomValidity("");
  !inputElement.validity.valid
    ? showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        inputErrorClass,
        errorClass
      )
    : hideInputError(formElement, inputElement, inputErrorClass, errorClass);
}

function setValidationListener(formElement, classSelectors) {
  const inputList = Array.from(
    formElement.querySelectorAll(classSelectors.inputElement)
  );
  const buttonElement = formElement.querySelector(classSelectors.buttonElement);
  toggleButtonState(
    inputList,
    buttonElement,
    classSelectors.inactiveButtonClass,
    classSelectors.inputElementErrorClass,
    classSelectors.errorElementActiveClass
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkValidity(
        formElement,
        inputElement,
        classSelectors.inputElementErrorClass,
        classSelectors.errorElementActiveClass
      );
      toggleButtonState(
        inputList,
        buttonElement,
        classSelectors.inactiveButtonClass
      );
    });
  });
}

export function enableValidation(classSelectors) {
  const formList = Array.from(
    document.querySelectorAll(classSelectors.formSelector)
  );
  formList.forEach((formElement) => {
    setValidationListener(formElement, classSelectors);
  });
}

export function clearValidation(form, validationConfig) {
  const submitButton = form.querySelector(validationConfig.buttonElement);
  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.disabled = true;
  const inputList = form.querySelectorAll(validationConfig.inputElement);
  inputList.forEach((inputElement) => {
    hideInputError(
      form,
      inputElement,
      validationConfig.inputElementErrorClass,
      validationConfig.errorElementActiveClass
    );
  });
}
