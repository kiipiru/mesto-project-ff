export function openPopUp(popUp) {
  popUp.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", handleEsc);
}

export function closePopUp(popUpTarget) {
  popUpTarget.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEsc);
}

export function handleEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_is-opened");
    closePopUp(openedPopUp);
  }
}

export function closePopUpByOverlay() {
const popUps = document.querySelectorAll(".popup");
  popUps.forEach(function (popup) {
    popup.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("popup_is-opened")) {
        closePopUp(popup);
      }
    });
  });
}

export function zoomInImage(evt) {
  const popUpImage = document.querySelector(".popup_type_image");
  document.querySelector(".popup__image").src = evt.target.src;
  document.querySelector(".popup__caption").textContent =
    evt.target.textContent;
  openPopUp(popUpImage);
}
