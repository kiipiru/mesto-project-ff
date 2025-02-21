import { initialCards } from "./scripts/cards.js";
import { removeCard, addLike, createCard } from "./scripts/card.js";
import { openPopUp, closePopUp, closePopUpByOverlay } from "./scripts/modal.js";
import "./pages/index.css";

const cardsSection = document.querySelector(".places__list");
const cardAddButton = document.querySelector(".profile__add-button");
const popUps = document.querySelectorAll(".popup");
const popUpImage = document.querySelector(".popup_type_image");
const popUpEdit = document.querySelector(".popup_type_edit");
const popUpAdd = document.querySelector(".popup_type_new-card");
const profileEditButton = document.querySelector(".profile__edit-button");
const popUpCloseButtons = document.querySelectorAll(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardAddForm = document.forms["new-place"];
const profileInfoForm = document.forms["edit-profile"];
const cardNameInput = cardAddForm.elements["place-name"];
const cardImageInput = cardAddForm.elements["link"];
const profileNameInput = profileInfoForm.elements.name;
const profileDescriptionInput = profileInfoForm.elements.description;

popUps.forEach((popUp) => {
  popUp.classList.add("popup_is-animated");
});

popUps.forEach((popUp) => {
  popUp.addEventListener("click", closePopUpByOverlay);
});

function toggleInitialCards(cardsContent) {
  const cardElement = createCard(
    cardsContent.name,
    cardsContent.link,
    removeCard,
    addLike,
    zoomInImage
  );
  cardsSection.append(cardElement);
}

initialCards.forEach((initialCards) => {
  toggleInitialCards(initialCards, removeCard, addLike, zoomInImage);
});

function addEventListener() {
  profileEditButton.addEventListener("click", () => {
    openPopUp(popUpEdit);
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  });
  cardAddButton.addEventListener("click", () => {
    openPopUp(popUpAdd);
  });
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(popUpEdit);
  profileInfoForm.reset();
}

profileInfoForm.addEventListener("submit", handleEditProfileFormSubmit);

function addCard(evt) {
  evt.preventDefault();
  const cardElement = createCard(
    cardNameInput.value,
    cardImageInput.value,
    removeCard,
    addLike,
    zoomInImage
  );
  cardsSection.prepend(cardElement);
  closePopUp(popUpAdd);
  cardAddForm.reset();
}

cardAddForm.addEventListener("submit", (evt) => {
  addCard(evt);
});

popUpCloseButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const popUpToClose = button.closest(".popup");
    closePopUp(popUpToClose);
    if ((popUpToClose === popUpEdit)) {
      profileInfoForm.reset();
    }
  });
});

function zoomInImage(cardImage, cardTitle) {
  document.querySelector(".popup__image").src = cardImage;
  document.querySelector(".popup__image").alt = cardTitle;
  document.querySelector(".popup__caption").textContent = cardTitle;
  openPopUp(popUpImage);
}

addEventListener();
closePopUpByOverlay();
