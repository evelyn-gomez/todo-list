import { Modal, homepage } from "./DOM";
import { testerTask , submitForm } from "./task";

if (homepage.classList.contains !== "hidden") {
  let modal = new Modal();
}
submitForm(); 

const button = document.querySelector(".open-modal button");
// Create an event object.
const event = new MouseEvent("click");
// Dispatch the event to the button.
button.dispatchEvent(event);

console.log(); 

// then do nothing
