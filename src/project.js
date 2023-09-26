export default class Project {
  constructor(name){
   this.name = name 
   this.tasks = []; 
  }
  
  getName(){
   return this.name; 
  }
 
  setAllTasks(tasks){
   this.tasks = tasks 
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

  setInDOM(parentElem){
   const newProjectDiv = document.createElement("div");
   const newProjectName = document.createElement("div"); 
   const newProjectDeleteBtn = document.createElement("button");

   newProjectDiv.classList.add("project"); 
   newProjectName.textContent = `${this.name}`
   newProjectDeleteBtn.textContent = "X"; 
   
   newProjectDiv.appendChild(newProjectName);
   newProjectDiv.appendChild(newProjectDeleteBtn);
   parentElem.appendChild(newProjectDiv); 
  }
 
}


