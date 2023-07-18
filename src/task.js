/* eslint-disable no-unused-vars */
import "./styles/main.css";
import { DateTime } from "luxon"; 

// task form and input values
const taskForm = document.querySelector("#task-form");
const tasksContainer = document.querySelector(".tasks-container"); 

class Task {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    // this.priority = document.querySelector('.priortity');
  }

}

// client-side form validation - NEEDED

function setDueDate(date){
  if(date === ""){
    const today = DateTime.now(DateTime.DATE_SHORT).toLocaleString();
    return today;
  } 
  // formatted date to 'MM/DD/YYYY' 
  const formattedDate = new Date(date).toLocaleDateString(); 
  return formattedDate; 
}

function addToTasksContainer(newTask){
  const taskDiv = document.createElement("div"); 
  const p = document.createElement("p");  
  p.textContent = "somewords here and there";
  taskDiv.appendChild(p);
  tasksContainer.appendChild(taskDiv); 
  console.log(newTask); 
};
const homepage = document.querySelector(".homepage");
const overlayDiv = document.querySelector(".overlay-modal");
const modalParent = document.querySelector(".modal-parent");

function addHiddenOverlayClasses(){
  modalParent.classList.add("hidden");
  overlayDiv.classList.add("hidden"); 
  homepage.classList.remove("hidden"); 
}

// task instantiated and added to DOM 
function submitForm() {
  taskForm.addEventListener("submit", (e) => {
    console.log(e);
    e.preventDefault(); 
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    let dueDate = document.querySelector("#dueDate").value;
    
    // reformat dueDate
    dueDate = setDueDate(dueDate);

    const task = new Task(title, description, dueDate);
    // // save task to Home - Task Container -- List 
    addToTasksContainer(task); 
    console.log(task); 
    //need to add this form else where 
    addHiddenOverlayClasses()
  });
}

export default submitForm




