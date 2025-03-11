// функции для card.js

export function sendLikeToServer(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-33/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "29815212-d12a-4e86-b346-3f523f6c96a0",
      },
    }
  );
}

export function deleteLikeFromServer(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-33/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "29815212-d12a-4e86-b346-3f523f6c96a0",
      },
    }
  );
}

export function removeCardFromServer(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-33/cards/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "29815212-d12a-4e86-b346-3f523f6c96a0",
      },
    }
  );
}

//　функции для index.js

export function changeAvatar(newAvatar) {
  return fetch(
    "https://mesto.nomoreparties.co/v1/wff-cohort-33/users/me/avatar",
    {
      method: "PATCH",
      headers: {
        authorization: "29815212-d12a-4e86-b346-3f523f6c96a0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: newAvatar,
      }),
    }
  );
}

export function sendNewCardToServer(cardName, cardLink) {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-33/cards", {
    method: "POST",
    headers: {
      authorization: "29815212-d12a-4e86-b346-3f523f6c96a0",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  });
}

export function sendProfileInfo(profileName, profileDescription) {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-33/users/me", {
    method: "PATCH",
    headers: {
      authorization: "29815212-d12a-4e86-b346-3f523f6c96a0",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profileName,
      about: profileDescription,
    }),
  });
}

export function getProfileInfo() {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-33/users/me", {
    headers: {
      authorization: "29815212-d12a-4e86-b346-3f523f6c96a0",
    },
  });
}

function getGroupCards() {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-33/cards", {
    headers: {
      authorization: "29815212-d12a-4e86-b346-3f523f6c96a0",
    },
  });
}

export const getDataForCards = function () {
  return Promise.all([getProfileInfo(), getGroupCards()]);
};
