/* eslint-disable no-unused-vars */
import "./styles/main.css";
import { DateTime } from "luxon";

// task form and input values
const taskForm = document.querySelector("form#task-form");
// will be the form add/submit and cancel button
const submitTaskFormBtn = document.querySelector("#add-button");
const cancelBtn = document.querySelector(".form-submit #cancel-button");

export class Task {
  /** @type Input Element */
  title;

  /** @type Input Element */
  description;

  /** @type Input Element */
  dueDate;

  // /**@type Select Element */
  // priority;
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    // this.priority = document.querySelector('.priortity');
  }

}

// client-side form validation - NEEDED

function setCurrentDate(){
  const today = DateTime.now(DateTime.DATE_SHORT).toLocaleString();
  return today;
}

export function submitForm() {
  taskForm.addEventListener("submit", () => {
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    let dueDate = document.querySelector("#dueDate").value;

    if(dueDate === ""){
      dueDate = setCurrentDate(); 
    }else{
      const date = new Date(dueDate); 
      dueDate = DateTime.tim 
    }
    const task = new Task(title, description, dueDate);
    console.log(task); 
    console.log(dueDate); 
  });
};

// const testerTitle = "Get Task to work";
// const testerDescription =
//   "I need the er to work -- then values from element working";
// const testerDueDate = DateTime.now().toISO();

// export const testerTask = new Task(testerTitle, testerDescription, testerDueDate);
 

