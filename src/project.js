import { setSideBarOption } from "./utils";
import Task from "./task";
import Storage from "./storage";

let projectId = 0;
function nextProjectId() {
  projectId += 1;
  return projectId;
}

/** @typedef {import("./taskForm").TaskParams} TaskParams */

export default class Project {
  /**
   * @param {string} name 
   * @param {{ tasks?: TaskParams[] }} options
   */
  constructor(name, { tasks = [] } = {}){
    this.id = nextProjectId(); 
    this.name = name 
    this.tasks = tasks; 
  }

  serialize() {
    const {name, tasks } = this; 
    return {name, tasks};
  }

  getName(){
    return this.name; 
  }
 
  setAllTasks(tasks){
   this.tasks = tasks 
  }

  setTasksToDOM(){
    for(const task of this.tasks){
      const domTask = new Task(task); 
      domTask.addToDOM(); 
    }
  }
 
  getAllTasks(){
   return this.tasks; 
  }
 
  setTask(newTask){
   this.tasks.push(newTask); 
  }
 
  #isInTasks(taskToFind){
  return this.tasks.find(task => 
     task.name === taskToFind.name)
  }
 
  getTask(taskToFind){
   return this.#isInTasks(taskToFind)
  }

  addToDOM(parentElem){
   const newProjectDiv = document.createElement("div");
   const newProjectName = document.createElement("div"); 
   const newProjectDeleteBtn = document.createElement("button");

   newProjectDiv.classList.add("project"); 
   newProjectDiv.id = this.id; 
   newProjectName.textContent = `${this.name}`
   newProjectDeleteBtn.textContent = "X"; 

   // set as current option; 
   setSideBarOption(newProjectDiv); 
  //  removeCurrentProjOrInbox(); 
  //  setProjTasks()
   Storage.addProject(this); 
  
   newProjectDiv.addEventListener("click", ()=>{
    setSideBarOption(newProjectDiv); 
    this.setTasksToDOM(); 
   });
  
   newProjectDiv.appendChild(newProjectName);
   newProjectDiv.appendChild(newProjectDeleteBtn);
   parentElem.appendChild(newProjectDiv); 
  }
 
}


