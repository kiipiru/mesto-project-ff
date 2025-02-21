export function openPopUp(popUp) {
  popUp.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", handleEsc);
}

export function closePopUp(popUpTarget) {
  const popUpEdit = document.querySelector(".popup_type_edit");
  popUpTarget.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEsc);
  if ((popUpTarget = popUpEdit)) {
    popUpTarget.querySelector("form").reset();
  }
}

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_is-opened");
    closePopUp(openedPopUp);
  }
}

export function closePopUpByOverlay() {
  const popUps = document.querySelectorAll(".popup");
  popUps.forEach(function (popUp) {
    popUp.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("popup_is-opened")) {
        closePopUp(popUp);
      }
    });
  });
}
