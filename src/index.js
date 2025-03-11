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
    console.log(profileAvatar.style.backgroundImage);
  });
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  showLoadingStatus(profileInfoForm.querySelector(".popup__button"), true);
  sendProfileInfo(profileNameInput.value, profileDescriptionInput.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      {
        return Promise.reject(res.status);
      }
    })
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
  sendNewCardToServer(cardNameInput.value, cardImageInput.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      {
        return Promise.reject(res.status);
      }
    })
    .then((data) => {
      cardsSection.prepend(
        createCard(
          data.name,
          data.link,
          data._id,
          data.likes.length,
          data.likes.some((array) => {
            return array._id.includes(profileData._id);
          }),
          removeCard,
          toggleLike,
          zoomInImage
        )
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

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error-active",
});

function renderInitialProfileInfo() {
  getProfileInfo()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      {
        return Promise.reject(res.status);
      }
    })
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
  changeAvatar(avatarEditInput.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
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
  if (isLoading) {
    formButton.textContent = "Сохранение...";
  } else {
    formButton.textContent = "Сохранить";
  }
}

function addInitialCards() {
  getDataForCards()
    .then(([res1, res2]) => {
      if (res1.ok && res2.ok) {
        return Promise.all([res1.json(), res2.json()]);
      }
      {
        return Promise.reject(`${res1.status}, ${res2.status}`);
      }
    })
    .then(([profileData, cardsData]) => {
      cardsData.forEach((card) => {
        const cardElement = createCard(
          card.name,
          card.link,
          card._id,
          card.likes.length,
          card.likes.some((array) => {
            return array._id.includes(profileData._id);
          }),
          card.owner._id === profileData._id,
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
