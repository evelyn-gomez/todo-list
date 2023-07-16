/* eslint-disable no-underscore-dangle */
import "./styles/main.css";

export const homepage = document.querySelector(".homepage");

function removeHiddenClass(div){  
  return div.classList.remove("hidden");
}

function addHiddenClass(div){ 
  return div.classList.add("hidden");
}

class Modal {
  // homepage;
  /** @type Element */
  modalBtn;

  modalParent;

  overlayDiv;

  constructor() {
    this.modalBtn = document.querySelector(".open-modal button");
    this.modalBtn.textContent = "New Task";
    this.overlayDiv = document.querySelector(".overlay-modal");
    this.modalParent = document.querySelector(".modal-parent");
    this.modalBtn.addEventListener("click", () => {
      addHiddenClass(homepage);
      removeHiddenClass(this.overlayDiv);
      removeHiddenClass(this.modalParent);
    });
    this.overlayDiv.addEventListener("click", () => {
      addHiddenClass(this.modalParent);
      addHiddenClass(this.overlayDiv);
      removeHiddenClass(homepage);
    });
  }
}
// Need the container that it click's
// to be the one that has the eventListener
// right now it's set to overlayDIV.addEventLlistern
export { Modal };


