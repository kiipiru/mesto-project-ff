export function createCard(
  cardNm,
  cardImg,
  removeCards,
  addLikeButton,
  zoomIn
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card");
  const cardElement = card.cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = cardNm;
  cardImage.src = cardImg;
  cardImage.alt = cardNm;
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
