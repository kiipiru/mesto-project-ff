import {
  sendLikeToServer,
  deleteLikeFromServer,
  removeCardFromServer,
} from "./api.js";

export function createCard(
  cardNm,
  cardImg,
  cardId,
  likeAmount,
  isLiked,
  createdByMe,
  removeCards,
  toggleLikeButton,
  zoomIn
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card");
  const cardElement = card.cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  cardLikeCounter.textContent = likeAmount;
  cardTitle.textContent = cardNm;
  cardImage.src = cardImg;
  cardImage.alt = cardNm;
  if (createdByMe) {
    cardDeleteButton.addEventListener("click", () =>
      removeCard(cardElement, cardId)
    );
  } else {
    cardDeleteButton.remove();
  }
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () => {
    toggleLike(likeButton, cardId, cardLikeCounter, isLiked).then(
      (newIsLiked) => {
        isLiked = newIsLiked;
      }
    );
  });
  cardImage.addEventListener("click", () =>
    zoomIn(cardImage.src, cardTitle.textContent)
  );
  return cardElement;
}

export function removeCard(card, cardId) {
  removeCardFromServer(cardId)
    .then((res) => {
      if (res.ok) {
        card.remove();
      }
      {
        return Promise.reject(res.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function toggleLike(cardLikeButton, cardId, cardLikeCounter, isLiked) {
  if (!isLiked) {
    return sendLikeToServer(cardId)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        {
          return Promise.reject(data.status);
        }
      })
      .then((data) => {
        cardLikeButton.classList.add("card__like-button_is-active");
        cardLikeCounter.textContent = data.likes.length;
        return !isLiked;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return deleteLikeFromServer(cardId)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        {
          return Promise.reject(data.status);
        }
      })
      .then((data) => {
        cardLikeButton.classList.remove("card__like-button_is-active");
        cardLikeCounter.textContent = data.likes.length;
        return !isLiked;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
