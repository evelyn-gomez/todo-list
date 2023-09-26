import "./styles/main.css";
import dom from "./DOM";
import Storage from "./storage";

document.addEventListener("DOMContentLoaded", ()=>{
  dom.initialListeners();
  Storage.load();
})



// const button = document.querySelector(".open-modal button");
// // Create an event object.
// const event = new MouseEvent("click");
// // Dispatch the event to the button.
// button.dispatchEvent(event);

