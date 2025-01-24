const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.card');
const cardsSection = document.querySelector('.places__list');

function toggleCard(cardsContent, removeCards) {
    const cardElement = card.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardsContent.link;
    cardImage.alt = cardsContent.name;
    cardElement.querySelector('.card__title').textContent = cardsContent.name;
    cardsSection.append(cardElement);
    cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', function() {
        removeCards(cardElement);
    });
    console.log(removeCards);
    return cardElement;
};

function removeCard(item) {
    item.remove();
};

initialCards.forEach((initialCards) => {
    toggleCard(initialCards, removeCard)
});
