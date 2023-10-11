/* eslint-disable class-methods-use-this */
import "./styles/main.css"

/** @typedef {{ id: number; title: string; dueDate: string; priority: string; done: boolean; }} TaskParams */

export default class TaskForm {

  get titleInput() {
    return document.querySelector("#title");
  }

  // get descriptionInput(){
  //   return document.querySelector("#description"); 
  // }

  get dueDateInput(){
    return document.querySelector("#dueDate");
  }

  get priorityInput(){
    return document.querySelector("#priority");
  }

  /**
   * @param {{ onSubmit: (params: TaskParams) => void }} params 
   */
  constructor({ onSubmit }) {
    this.onSubmit = onSubmit;
    this.taskForm = document.querySelector("#task-form");
    this.cancelBtn = document.querySelector("#cancel-button");
    this.taskForm.addEventListener("submit", (e)=>{
      e.preventDefault(); 
      const title = this.titleInput.value;
      const dueDate = this.dueDateInput.value; 
      const priority = this.priorityInput.value; 
      this.onSubmit({
        title, dueDate, priority,
      }); 
      this.reset(); 
    });
  }

  reset(){
    this.titleInput.value = ""; 
    this.dueDateInput.value = "";
    // this.descriptionInput.value = "";
    this.priorityInput.value = ""
  }

  cancel(){
   this.reset(); 
  }

}

