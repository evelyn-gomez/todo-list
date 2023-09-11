import { removeFadeOut } from "./utils";

function isTitle(taskTitle){
  const minLength = taskTitle.getAttribute("minlength");
  const maxlength = taskTitle.getAttribute("maxlength"); 

  if(taskTitle.value.length <= maxlength && taskTitle.value.length >= minLength){
    return true; 
  }return false; 
}

function taskEditing(taskDOMItems){
  taskDOMItems.forEach(item =>{
    item.classList.add("edit"); 
    if(item.hasAttribute("readonly")){
      item.removeAttribute("readonly", "readonly");
    }else if(item.hasAttribute("disabled")){
      item.removeAttribute("disabled","disabled");
    }
  })
}

/* eslint-disable no-param-reassign */
/**
 * 
 * @param {Element} editBtn
 * @param {HTMLCollectionBase} taskDOMDivs
 * @param {HTMLAllCollection} taskDOMItems
 */
export function editTask(editBtn, taskDOMDivs, taskDOMItems){
  const taskTitleDiv = taskDOMDivs.find(item => item.classList.contains("title-item")); 
  const titleLabel = taskTitleDiv.querySelector("label"); 
  const taskDiv = taskTitleDiv.parentElement;
  if(editBtn.textContent === "Edit" ){
    taskDiv.classList.add("editing"); 
    /** TASKDIV will have transform transition to allow it to look like its been edited */
    titleLabel.textContent = "Title must be between 2 - 22 characters";  
    editBtn.textContent = "Save"; 
    taskEditing(taskDOMItems); 
  } else{
    if(!isTitle(taskTitleDiv.querySelector("input"))){
      return; 
    }
    editBtn.textContent = "Edit"
    taskDiv.classList.remove("editing"); 
    titleLabel.textContent = ""; 
    taskDOMItems.forEach(item =>{
      item.classList.remove("edit"); 
      if(!item.hasAttribute("readonly")){
        item.setAttribute("readonly","readonly");
      }else if(!item.hasAttribute("disabled")){
        item.setAttribute("disabled","disabled"); 
      }
    })
  }
}

export function removeTask(taskDiv){
  removeFadeOut(taskDiv, 2000);
}

export function addToLocalStorage(taskObj){
  const taskName = taskObj.name; 
  const taskDeSerialized = JSON.stringify(taskObj);
  localStorage.setItem(taskName, taskDeSerialized);
  console.log(taskName);
  console.log(localStorage.getItem(taskName)); 
} 

export function getLocalStorage(){
  // const tasksArrayFromStorage = []; 
  // const keys = Object.keys(localStorage); 
  // console.log(keys); 
}

export function removeFromLocalStorage(key){
  localStorage.removeItem(key); 
}






