import { setSideBarOption, getCurrentOption } from "./utils";
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

  /**
   * 
   * @returns {Object}; 
   */
  serialize() {
    const {name, tasks} = this; 
    return {name, tasks};
  }

  getName(){
    return this.name; 
  }
 
  setAllTasks(tasks){
   this.tasks = tasks 
  }

  setTasksToDOM(){
    const taskContainer = document.querySelector(".tasks");
    const id = taskContainer.getAttribute("id"); 
  
    if(this.name === id){
      // do nothing
      return
    }
    taskContainer.replaceChildren(); 
    taskContainer.removeAttribute("id");
    
    taskContainer.setAttribute("id",`${this.name}`); 

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
    newTask.addToDOM(); 
  }
 
  #isInTasks(taskToFind){
  return this.tasks.find(task => 
     task.name === taskToFind.name)
  }
 
  getTask(taskToFind){
   return this.#isInTasks(taskToFind)
  }

  addToDOM(){
    const parentElem = document.querySelector(".projects-added"); 
    const projectElem = document.createElement("div");
    const projectNameElem = document.createElement("div"); 
    const projectDeleteBtn = document.createElement("button");

    projectElem.classList.add("project"); 
    projectElem.id = this.name; 
    projectNameElem.textContent = `${this.name}`
    projectDeleteBtn.textContent = "X"; 

    projectElem.appendChild(projectNameElem);
    projectElem.appendChild(projectDeleteBtn);
    parentElem.appendChild(projectElem); 

    // this.setTasksToDOM(parentElem) 
    //  removeCurrentProjOrInbox(); 
    //  setProjTasks()
    // Storage.addProject(this); 
    projectElem.addEventListener("click", ()=>{
      setSideBarOption(projectElem);
      this.setTasksToDOM(); 
      console.log(projectElem.id); 
      this.setTasksToDOM()
      // this.setTasksToDOM(); 
    });



  }
 
}


