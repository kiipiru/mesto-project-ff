export function toggleCard(cardsContent, removeCards, addLikeButton, zoomIn) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card");
  const cardsSection = document.querySelector(".places__list");
  const cardElement = card.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardImage.src = cardsContent.link;
  cardImage.alt = cardsContent.name;
  cardElement.querySelector(".card__title").textContent = cardsContent.name;
  cardsSection.append(cardElement);
  cardDeleteButton.addEventListener("click", removeCards);
  likeButton.addEventListener("click", addLikeButton);
  cardImage.addEventListener("click", zoomIn);
  return cardElement;
}

export function removeCard(evt) {
  evt.target.closest(".card").remove();
}

export function addLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
