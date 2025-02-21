import { initialCards } from './scripts/cards.js';
import { toggleCard, removeCard, addLike } from './scripts/card.js';
import { openPopUp, closePopUp, handleEsc, closePopUpByOverlay, closePopUpByCloseButton, zoomInImage } from './scripts/modal.js';
import './pages/index.css'

const cardTemplate = document.querySelector("#card-template").content;
const card = cardTemplate.querySelector(".card");
const cardsSection = document.querySelector(".places__list");
const cardAddButton = document.querySelector(".profile__add-button");
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
let profileNameInput = profileInfoForm.elements.name;
profileNameInput.value = profileName.textContent;
let profileDescriptionInput = profileInfoForm.elements.description;
profileDescriptionInput.value = profileDescription.textContent;

initialCards.forEach((initialCards) => {
  toggleCard(initialCards, removeCard, addLike, zoomInImage);
})

function addEventListener() {
  profileEditButton.addEventListener("click", () => {
    openPopUp(popUpEdit);
  });
  cardAddButton.addEventListener("click", () => {
    openPopUp(popUpAdd);
  });
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(evt.target.closest(".popup"));
}

profileInfoForm.addEventListener("submit", handleFormSubmit);

function addCard(evt, removeCards, addLikeButton, zoomIn) {
  evt.preventDefault();
  const newCard = card.cloneNode(true);
  const newCardName = newCard.querySelector(".card__title");
  const newCardImage = newCard.querySelector(".card__image");
  const cardDeleteButton = newCard.querySelector(".card__delete-button");
  newCardName.textContent = cardNameInput.value;
  newCardImage.src = cardImageInput.value;
  newCardImage.alt = newCardName.textContent;
  cardDeleteButton.addEventListener("click", removeCards);
  const likeButton = newCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", addLikeButton);
  newCardImage.addEventListener("click", zoomIn);
  cardsSection.prepend(newCard);
  closePopUp(evt.target.closest(".popup"));
  cardAddForm.reset();
}

cardAddForm.addEventListener("submit", (evt) => {
  addCard(evt, removeCard, addLike, zoomInImage);
})

popUpCloseButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const popUpToClose = button.closest(".popup");
    const formToReset = popUpToClose.querySelector("form");
    if (popUpToClose === popUpEdit) {
      if (profileNameInput.value !== profileName.textContent) {
        profileNameInput.value = profileName.textContent;
      }
      if (profileDescriptionInput.value !== profileDescription.textContent) {
        profileDescriptionInput.value = profileDescription.textContent;
      }
    }
    if (popUpToClose.contains(formToReset)) {
      formToReset.reset();
    }
    closePopUp(popUpToClose);
  });
});

addEventListener();
closePopUpByOverlay();