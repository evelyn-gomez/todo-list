import "./styles/main.css";
import dom from "./DOM";
import { addToLocalStorage, getLocalStorage } from "./handlers";


dom.initialListeners();


// const button = document.querySelector(".open-modal button");
// // Create an event object.
// const event = new MouseEvent("click");
// // Dispatch the event to the button.
// button.dispatchEvent(event);

const task = {
  name: "testerTask", 
  description: "describe", 
  dueDate: "parseIn destructured? date",  
  priority: "low, med, or high",
}
 
addToLocalStorage(task); 
// getLocalStorage(); 

