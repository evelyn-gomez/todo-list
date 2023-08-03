import "./styles/main.css"

/** @typedef {{ title: string; description: string; dueDate: string; priority: string}} TaskParams */

export default class TaskForm {

  get titleInput() {
    return document.querySelector("#title");
  }

  get descriptionInput(){
    return document.querySelector("#description"); 
  }

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
      const description = this.descriptionInput.value; 
      const dueDate = this.dueDateInput.value; 
      const priority = this.priorityInput.value; 
      this.onSubmit({
        title, description, dueDate, priority
      }); 
      this.reset(); 
    });
  }

  reset(){
    this.titleInput.value = ""; 
    this.dueDateInput.value = "";
    this.descriptionInput.value = "";
    this.priorityInput.value = ""
  }

  cancel(){
    return this.cancelBtn; 
  }

}
