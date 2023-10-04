import { DateTime } from "luxon";

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

export const headersOfMenu = ["Inbox", "Weekly", "Projects"]; 

export function addHeadersofMenu(childrenofMenu){
  for(let i=0; i < childrenofMenu.length; i++){
    const child = childrenofMenu[i]; 
    child.querySelector("h3").textContent = headersOfMenu[i]; 
  }
}

export function removeHeadersOfMenu(childrenofMenu){
  for(const child of childrenofMenu){
    child.querySelector("h3").textContent = ""; 
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
 * @param {Element} toggleEditBtn
 * @param {HTMLCollectionBase} taskDOMDivs
 * @param {HTMLAllCollection} taskDOMItems
 */
export function enableEditing(toggleEditBtn, taskDOMDivs, taskDOMItems){
  const taskTitleDiv = taskDOMDivs.find(item => item.classList.contains("title-item")); 
  const titleLabel = taskTitleDiv.querySelector("label"); 
  const taskDiv = taskTitleDiv.parentElement;
  taskDiv.classList.add("editing"); 
  /** TASKDIV will have transform transition to allow it to look like its been edited */
  titleLabel.textContent = "Title must be between 2 - 22 characters";  
  toggleEditBtn.textContent = "Save"; 
  taskEditing(taskDOMItems); 
}

export function disableEditing(toggleEditBtn, taskDOMDivs, taskDOMItems){
  const taskTitleDiv = taskDOMDivs.find(item => item.classList.contains("title-item")); 
  const titleLabel = taskTitleDiv.querySelector("label"); 
  const taskDiv = taskTitleDiv.parentElement;
  if(!isTitle(taskTitleDiv.querySelector("input"))){
    // taskDiv.classList.remove("editing");
    return; 
  }
  toggleEditBtn.textContent = "Edit"
  taskDiv.classList.remove("editing"); 
  titleLabel.textContent = ""; 
  taskDOMItems.forEach(item =>{
    item.classList.remove("edit"); 
    if(!item.hasAttribute("readonly")){
      item.setAttribute("readonly","readonly");
    }else if(!item.hasAttribute("disabled")){
      item.setAttribute("disabled","disabled"); 
    }
    // item.removeAttribute("readonly", "readonly"); 
    // item.removeAttribute("disabled", "disabled"); 
  });
} 

export const taskTester = {
  title: "tester_title",
  dueDate: "9/12/2023", 
  priority: "low", 
}

export function removeActiveProject(projectsParent){
  const projectsCollection = projectsParent.children; 
  const projectsArray = Array.from(projectsCollection); 
  const activeElement = projectsArray.find(element => element.classList.contains("active"))
  projectsParent.removeChild(activeElement); 
  projectsParent.classList.remove("active"); 
}

export function getCurrentOption(){
  const sideMenuOptions = Array.from(document.querySelector(".side-bar-menu").children);
  const projectMenuOptions = Array.from(document.querySelector(".projects-added").children); 
  let currentOption; 

  for(const option of sideMenuOptions){
    if(!option.classList.contains("projects")){
      if(option.classList.contains("active-tasks")){
        currentOption = option; 
        return currentOption; 
      }
    }
  }
  if(projectMenuOptions.length >=1){
    for(const option of projectMenuOptions){
      if(option.classList.contains("active-tasks")){
        currentOption = option; 
        return currentOption; 
      }
    }
  }
  currentOption = undefined; 
  return currentOption; 

}
/**
 * 
 * @param {Element} selectedOption 
 * @returns 
 */
export function setSideBarOption(activeSideBar){
  // what is activeSideBar 
  // get what is the currentOptionSelected; 
  const currentOption = getCurrentOption();

  currentOption.classList.remove("active-tasks"); 
  activeSideBar.classList.add("active-tasks");
} 


export function disableProjectInput(projectsParentElem){
  if(projectsParentElem.classList.contains("active")){
    removeActiveProject(projectsParentElem);
  }
}

export function getAllProjects(projectParent){
  if(projectParent.firstElementChild){
    return true;
  }
  return false
}


export function updateCheckedStatusClass(DOMTaskCompleted, taskDOMItems){
  if(DOMTaskCompleted.checked){
    DOMTaskCompleted.classList.add("green");
    taskDOMItems.forEach(item =>{
      item.classList.add("completed-task"); 
    })
  }else{
    // else if(taskDOMItems[0].classList.contains("completed-task"))
    DOMTaskCompleted.classList.remove("green"); 
    taskDOMItems.forEach(item =>{
      item.classList.remove("completed-task"); 
    })
  }
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
  const projectsParent = document.querySelector(".projects-added"); 
  projectsParent.classList.add("active");

  const tempDOMProject = createTempProject();
  projectsParent.appendChild(tempDOMProject.div); 


  tempDOMProject.addBtn.addEventListener("click",(e)=>{;
    tempDOMProject.div.classList.remove("active"); 
    projectsParent.classList.remove("active"); 
    projectsParent.removeChild(tempDOMProject.div);
    e.preventDefault();
  });

  tempDOMProject.deleteBtn.addEventListener("click", (e)=>{
    projectsParent.removeChild(tempDOMProject.div);  
    projectsParent.classList.remove("active"); 
    e.preventDefault(); 
  })
  tempDOMProject.div.addEventListener("keyup", (e)=>{
    e.preventDefault(); 
    if(e.key === "Enter"){
      tempDOMProject.div.classList.remove("active"); 
      projectsParent.classList.remove("active"); 
      projectsParent.removeChild(tempDOMProject.div);
    }
  })
  tempDOMProject.input.focus()
  return tempDOMProject; 
}

export function expandSideBar(icon, sideBarContainer){
  const allOptionsOfSideMenu = Array.from(sideBarContainer.querySelector(".side-bar-menu").children); 
  const selectableOptions = allOptionsOfSideMenu.filter(option => !option.classList.contains("projects-all-container")); 
  const mainProjects = sideBarContainer.querySelector(".projects-all-container"); 
  
  mainProjects.removeAttribute("id", "projects-hidden"); 
  sideBarContainer.classList.remove("collapse"); 
  icon.classList.remove("collapse-icon");
  // projectsCreated.removeAttribute("id","projects-hidden"); 
  addHeadersofMenu(selectableOptions);
}

export function collapseSideBar(icon,sideBarContainer){
  const allOptionsOfSideMenu = Array.from(sideBarContainer.querySelector(".side-bar-menu").children); 
  const selectableOptions = allOptionsOfSideMenu.filter(option => !option.classList.contains("projects-all-container")); 
  const mainProjects = sideBarContainer.querySelector(".projects-all-container"); 

  mainProjects.id = "projects-hidden"; 
  sideBarContainer.classList.add("collapse");
  icon.classList.add("collapse-icon");
  removeHeadersOfMenu(selectableOptions);

  
}

