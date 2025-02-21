export function openPopUp(popUp) {
  popUp.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEsc);
}

export function closePopUp(popUpTarget) {
  popUpTarget.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEsc);
}

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_is-opened");
    closePopUp(openedPopUp);
  }
}

export function closePopUpByOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopUp(evt.target);
  }
}
