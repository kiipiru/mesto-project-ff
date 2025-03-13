import {
  sendLikeToServer,
  deleteLikeFromServer,
  removeCardFromServer,
} from "./api.js";

import { configForAPI } from "../index.js";

export function createCard(cardsData, userId, removeCards, toggleLike, zoomIn) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card");
  const cardElement = card.cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  // информация с сервера
  const userProfileId = userId;
  const cardData = cardsData;
  const cardId = cardData._id;
  let isLikedByMe = cardData.likes.some((like) => {
    return like._id.includes(userProfileId);
  });

  cardLikeCounter.textContent = cardData.likes.length;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  if (cardData.owner._id === userProfileId) {
    cardDeleteButton.addEventListener("click", () =>
      removeCards(cardElement, cardId)
    );
  } else {
    cardDeleteButton.remove();
  }
  if (isLikedByMe) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () => {
    toggleLike(likeButton, cardId, cardLikeCounter, isLikedByMe).then(
      (newIsLiked) => {
        isLikedByMe = newIsLiked;
      }
    );
  });
  cardImage.addEventListener("click", () =>
    zoomIn(cardImage.src, cardTitle.textContent)
  );
  return cardElement;
}

export function removeCard(card, cardId) {
  removeCardFromServer(configForAPI, cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function toggleLike(cardLikeButton, cardId, cardLikeCounter, isLiked) {
  const likeMethod = isLiked ? deleteLikeFromServer : sendLikeToServer;
  return likeMethod(configForAPI, cardId)
    .then((data) => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
      cardLikeCounter.textContent = data.likes.length;
      return !isLiked;
    })
    .catch((err) => console.log(err));
}
