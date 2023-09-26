import { DateTime } from "luxon";
import Project from "./project";

export const taskClassesforItems = ["check-item", "title-item", "dueDate-item", "priority-item"]; 
export const priorities = ["","low", "medium", "high"];

export function setDueDate(date){
  if(date === ""){
    // might want to uninstall luxon and install date-fns instead -- recomme  nded library from TOP 
    const today = DateTime.now(DateTime.DATE_SHORT)
    const tomorrow = today.plus({ days: 1 }).toLocaleString();
    return tomorrow;
  } 
  // formatted date to 'MM/DD/YYYY' 
  const formattedDate = new Date(date).toLocaleDateString(); 
  return formattedDate; 
}

export function convertDueDateFormat(inputDate){
  let [month, day, year] = inputDate.split("/");

  if(month.length === 1){
    month = `0${month}`;
  }

  if(day.length === 1){
    day = `0${day}`; 
  }

  const updatedDate  = `${year}-${month}-${day}`;
  return updatedDate; 
}

export const headersOfMenu = ["Inbox", "This Week", "Projects"]; 

export function addHeadersofMenu(childrenofMenu){
  // eslint-disable-next-line no-plusplus
  for(let i=0; i < childrenofMenu.length; i++){
    const child = childrenofMenu[i];
    child.querySelector("p").textContent = headersOfMenu[i]; 
  }
}

export function removeHeadersOfMenu(childrenofMenu){
  for(let i=0; i < childrenofMenu.length; i++){
    const child = childrenofMenu[i];
    child.querySelector("p").textContent = ""; 
  }
}

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
export default function editTask(editBtn, taskDOMDivs, taskDOMItems){
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
      // taskDiv.classList.remove("editing");
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
    });
    // update Storage.inbox
    // call Storage.store()
  }
}

export const taskTester = {
  title: "tester_title",
  dueDate: "9/12/2023", 
  priority: "low", 
}
export const taskTester2 = {
  title: "tester-2", 
  dueDate: "9/27/23", 
  priority: "low",
  done: true,
};
export function removeActiveProject(projectsParent){
  const projectsCollection = projectsParent.children; 
  const projectsArray = Array.from(projectsCollection); 
  const activeElement = projectsArray.find(element => element.classList.contains("active"))
  projectsParent.removeChild(activeElement); 
  projectsParent.classList.remove("active"); 
}

function createTempProject() {
  const div = document.createElement("div"); 
  const input = document.createElement("input"); 
  const addBtn = document.createElement("button"); 
  const deleteBtn = document.createElement("button"); 
  
  div.classList.add("temp-project"); 
  div.classList.add("active");  

  input.id = "project-input"; 
  addBtn.id = "project-add-button"; 
  deleteBtn.id = "project-delete-button";

  addBtn.textContent = "Add"; 
  deleteBtn.textContent = "Delete";

  div.appendChild(input); 
  div.appendChild(addBtn); 
  div.appendChild(deleteBtn); 

  return {div, input, addBtn, deleteBtn}
}

export function createNewProjectInput(){
  const projectsParent = document.querySelector(".projects-all-container"); 
  projectsParent.classList.add("active");
  
  const tempProject = createTempProject();
  projectsParent.appendChild(tempProject.div); 

  tempProject.addBtn.addEventListener("click",(e)=>{;
    tempProject.div.classList.remove("active"); 
    projectsParent.classList.remove("active"); 
    projectsParent.removeChild(tempProject.div);
    const newProject = new Project(tempProject.input.value);
    // add project to storage
    newProject.setInDOM(projectsParent); 
    e.preventDefault();
  });

  tempProject.deleteBtn.addEventListener("click", (e)=>{
    projectsParent.removeChild(tempProject.div);  
    projectsParent.classList.remove("active"); 
    e.preventDefault(); 
  })
  tempProject.div.addEventListener("keyup", (e)=>{
    e.preventDefault(); 
    if(e.key === "Enter"){
      tempProject.div.classList.remove("active"); 
      projectsParent.classList.remove("active"); 
      projectsParent.removeChild(tempProject.div);
      // add project to storage
      // keep project in DOM
      const newProject = new Project(tempProject.input.value);
      newProject.setInDOM(projectsParent); 
    }
  })
  tempProject.input.focus()
}

export function expandSideBar(icon, sideBarContainer){
  const menuDiv = sideBarContainer.querySelector(".side-bar-menu"); 
  const projectMenu = menuDiv.querySelector(".projects div"); 
  const childrenofMenu = menuDiv.children;
  sideBarContainer.classList.remove("collapse"); 
  icon.classList.remove("collapse-icon");
  projectMenu.removeAttribute("id","projects-hidden"); 
  addHeadersofMenu(childrenofMenu);
}

export function collapseSideBar(icon,sideBarContainer){
  const menuDiv = sideBarContainer.querySelector(".side-bar-menu"); 
  const projectMenu = menuDiv.querySelector(".projects div"); 
  const childrenofMenu = menuDiv.children;
  sideBarContainer.classList.add("collapse");
  icon.classList.add("collapse-icon");
  projectMenu.setAttribute("id","projects-hidden"); 
  removeHeadersOfMenu(childrenofMenu);
}

export function getAllProjects(projectParent){
  if(projectParent.firstElementChild){
    return true;
  }
  return false
}

