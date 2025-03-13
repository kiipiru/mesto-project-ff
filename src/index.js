import { removeCard, toggleLike, createCard } from "./scripts/card.js";
import { openPopUp, closePopUp, closePopUpByOverlay } from "./scripts/modal.js";
import {
  changeAvatar,
  sendNewCardToServer,
  sendProfileInfo,
  getProfileInfo,
  getDataForCards,
} from "./scripts/api.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import "./pages/index.css";

const cardsSection = document.querySelector(".places__list");
const cardAddButton = document.querySelector(".profile__add-button");
const popUps = document.querySelectorAll(".popup");
const popUpImage = document.querySelector(".popup_type_image");
const popUpEditProfile = document.querySelector(".popup_type_edit");
const popUpEditAvatar = document.querySelector(".popup_type_edit-avatar");
const popUpAdd = document.querySelector(".popup_type_new-card");
const imageInsidePopUp = document.querySelector(".popup__image");
const popUpImageCaption = document.querySelector(".popup__caption");
const profileEditButton = document.querySelector(".profile__edit-button");
const popUpCloseButtons = document.querySelectorAll(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const cardAddForm = document.forms["new-place"];
const profileInfoForm = document.forms["edit-profile"];
const avatarEditForm = document.forms["new-avatar"];
const cardNameInput = cardAddForm.elements["place-name"];
const cardImageInput = cardAddForm.elements["link"];
const profileNameInput = profileInfoForm.elements.name;
const profileDescriptionInput = profileInfoForm.elements.description;
const avatarEditInput = avatarEditForm.elements.avatar;
const pageForms = document.querySelectorAll(".popup__form");
const validationConfig = {
  buttonElement: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputElement: ".popup__input",
  inputElementErrorClass: "popup__input_type_error",
  errorElementActiveClass: "popup__input-error-active",
  formSelector: ".popup__form",
  errorClass: "popup__input-error-active",
};
export const configForAPI = {
  URL: "https://mesto.nomoreparties.co/v1/wff-cohort-33",
  token: "29815212-d12a-4e86-b346-3f523f6c96a0",
};

popUps.forEach((popUp) => {
  popUp.classList.add("popup_is-animated");
});

popUps.forEach((popUp) => {
  popUp.addEventListener("click", (evt) => {
    closePopUpByOverlay(evt);
  });
});

function addEventListener() {
  profileEditButton.addEventListener("click", () => {
    clearValidation(profileInfoForm, validationConfig);
    openPopUp(popUpEditProfile);
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  });
  cardAddButton.addEventListener("click", () => {
    openPopUp(popUpAdd);
  });
  profileAvatar.addEventListener("click", () => {
    openPopUp(popUpEditAvatar);
  });
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  showLoadingStatus(profileInfoForm.querySelector(".popup__button"), true);
  sendProfileInfo(
    configForAPI,
    profileNameInput.value,
    profileDescriptionInput.value
  )
    .then((profileData) => {
      profileName.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
    })
    .catch((err) => console.log(err))
    .finally(() =>
      showLoadingStatus(profileInfoForm.querySelector(".popup__button"), false)
    );
  closePopUp(popUpEditProfile);
}

profileInfoForm.addEventListener("submit", handleEditProfileFormSubmit);

function addCard(evt) {
  evt.preventDefault();
  showLoadingStatus(cardAddForm.querySelector(".popup__button"), true);
  sendNewCardToServer(configForAPI, cardNameInput.value, cardImageInput.value)
    .then((data) => {
      cardsSection.prepend(
        createCard(data, data.owner._id, removeCard, toggleLike, zoomInImage)
      );
    })
    .then(() => {
      closePopUp(popUpAdd);
      cardAddForm.reset();
      clearValidation(cardAddForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showLoadingStatus(cardAddForm.querySelector(".popup__button"), false);
    });
}

cardAddForm.addEventListener("submit", (evt) => {
  addCard(evt);
});

popUpCloseButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const popUpToClose = button.closest(".popup");
    closePopUp(popUpToClose);
  });
});

function zoomInImage(cardImage, cardTitle) {
  imageInsidePopUp.src = cardImage;
  imageInsidePopUp.alt = cardTitle;
  popUpImageCaption.textContent = cardTitle;
  openPopUp(popUpImage);
}

addEventListener();

enableValidation(validationConfig);

function renderInitialProfileInfo() {
  getProfileInfo(configForAPI)
    .then((profileData) => {
      profileName.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      profileAvatar.style.backgroundImage = `url(${profileData.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    });
}

renderInitialProfileInfo();

function handleAvatarEditFormSubmit(evt) {
  evt.preventDefault();
  showLoadingStatus(avatarEditForm.querySelector(".popup__button"), true);
  changeAvatar(configForAPI, avatarEditInput.value)
    .then((newAvatarData) => {
      profileAvatar.style.backgroundImage = `url(${newAvatarData.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showLoadingStatus(avatarEditForm.querySelector(".popup__button"), false);
    });
  closePopUp(popUpEditAvatar);
  avatarEditForm.reset();
}

avatarEditForm.addEventListener("submit", handleAvatarEditFormSubmit);

function showLoadingStatus(formButton, isLoading) {
  isLoading
    ? (formButton.textContent = "Сохранение...")
    : (formButton.textContent = "Сохранить");
}

function addInitialCards() {
  getDataForCards(configForAPI)
    .then(([profileData, cardsData]) => {
      cardsData.forEach((card) => {
        const cardElement = createCard(
          card,
          profileData._id,
          removeCard,
          toggleLike,
          zoomInImage
        );
        cardsSection.append(cardElement);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

addInitialCards();
