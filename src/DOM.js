/* eslint-disable no-underscore-dangle */
import "./styles/main.css";

export const homepage = document.querySelector(".homepage");
const modalBtn = document.querySelector(".open-modal button");
modalBtn.textContent = "New Task";
const overlayDiv = document.querySelector(".overlay-modal");
const modalParent = document.querySelector(".modal-parent");

function removeHiddenClass(div){  
  return div.classList.remove("hidden");
}

function addHiddenClass(div){ 
  return div.classList.add("hidden");
}

function removeHiddenOverlayClasses(){
  addHiddenClass(homepage);
  removeHiddenClass(overlayDiv);
  removeHiddenClass(modalParent);
}

function addHiddenOverlayClasses(){
  addHiddenClass(modalParent);
  addHiddenClass(overlayDiv);
  removeHiddenClass(homepage);
}

class Modal{
  constructor(){
    modalBtn.addEventListener("click", removeHiddenOverlayClasses);
    overlayDiv.addEventListener("click", addHiddenOverlayClasses);
  }

  // eslint-disable-next-line class-methods-use-this
  remove() {
    removeHiddenOverlayClasses();
  }

  // eslint-disable-next-line class-methods-use-this
  add(){
    addHiddenOverlayClasses();
  }
}

export default Modal





