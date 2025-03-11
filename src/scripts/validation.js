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
  const errorMessages = {
    patternMismatch: inputElement.dataset.patternMismatchErrorMessage,
    valueMissing: inputElement.dataset.emptyInputErrorMessage,
    typeMismatch:
      inputElement.type === "url"
        ? inputElement.dataset.notUrlErrorMessage
        : "",
  };
  const errorKey = Object.keys(errorMessages).find(
    (key) => inputElement.validity[key]
  );
  inputElement.setCustomValidity(errorKey ? errorMessages[errorKey] : "");
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
      formElement.querySelectorAll(classSelectors.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      classSelectors.submitButtonSelector
    );
    toggleButtonState(
      inputList,
      buttonElement,
      classSelectors.inactiveButtonClass,
      classSelectors.inputErrorClass,
      classSelectors.errorClass
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkValidity(
          formElement,
          inputElement,
          classSelectors.inputErrorClass,
          classSelectors.errorClass
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
  form.querySelector(validationConfig.buttonElement).classList.add(validationConfig.inactiveButtonClass);
  const inputList = form.querySelectorAll(validationConfig.inputElement);
  inputList.forEach((inputElement) => {
    inputElement.classList.remove(validationConfig.inputElementErrorClass);
  });
  const errorElement = form.querySelector(
    `${validationConfig.inputElement}-error`
  );
  errorElement.classList.remove(validationConfig.errorElementActiveClass);
  errorElement.textContent = "";
}
