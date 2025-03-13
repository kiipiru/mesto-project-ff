// функции для card.js

function handleResults(res) {
  if (res.ok) {
    return res.json();
  }
  {
    return Promise.reject(res.status);
  }
}

export function sendLikeToServer(config, cardId) {
  return fetch(`${config.URL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: `${config.token}`,
    },
  }).then(handleResults);
}

export function deleteLikeFromServer(config, cardId) {
  return fetch(`${config.URL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: `${config.token}`,
    },
  }).then(handleResults);
}

export function removeCardFromServer(config, cardId) {
  return fetch(`${config.URL}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: `${config.token}`,
    },
  }).then(handleResults);
}

//　функции для index.js

export function changeAvatar(config, newAvatar) {
  return fetch(`${config.URL}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: `${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: newAvatar,
    }),
  }).then(handleResults);
}

export function sendNewCardToServer(config, cardName, cardLink) {
  return fetch(`${config.URL}/cards`, {
    method: "POST",
    headers: {
      authorization: `${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then(handleResults);
}

export function sendProfileInfo(config, profileName, profileDescription) {
  return fetch(`${config.URL}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profileName,
      about: profileDescription,
    }),
  }).then(handleResults);
}

export function getProfileInfo(config) {
  return fetch(`${config.URL}/users/me`, {
    headers: {
      authorization: `${config.token}`,
    },
  }).then(handleResults);
}

function getGroupCards(config) {
  return fetch(`${config.URL}/cards`, {
    headers: {
      authorization: `${config.token}`,
    },
  }).then(handleResults);
}

export const getDataForCards = function (config) {
  return Promise.all([getProfileInfo(config), getGroupCards(config)]);
};
