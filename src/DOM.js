/* eslint-disable no-underscore-dangle */
import "./styles/main.css";
import TaskForm from "./form";
import Task from "./task";


class DOM {
  constructor(){
    // home and overlay containers 
    this.homepage = document.querySelector(".homepage");
    this.modalBtn = document.querySelector(".open-modal button");
    this.modalBtn.textContent = "New Task";
    this.overlayDiv = document.querySelector(".overlay-modal");
    this.modalParent = document.querySelector(".modal-parent");
    this.form = document.querySelector("#task-form"); 
  }

  /**
   * @param {import("./form").TaskParams} taskParams 
   */
  addTask({ title, description, dueDate, priority }){
    const task = new Task(title, description, dueDate, priority);
    task.addToDOM();
    this.closeModal();
  }

 openModal(){
  this.homepage.classList.add("hidden"); 
  this.overlayDiv.classList.remove("hidden"); 
  this.modalParent.classList.remove("hidden"); 
 }

 closeModal(){
  this.modalParent.classList.add("hidden"); 
  this.overlayDiv.classList.add("hidden"); 
  this.homepage.classList.remove("hidden"); 
 }

 initialListeners(){
    this.modalBtn.addEventListener("click", ()=>{
      this.openModal();
    });
    this.overlayDiv.addEventListener("click", ()=>{
      this.closeModal(); 
    });
    this.form = new TaskForm({ onSubmit: (...args) => this.addTask(...args) });
    const formCancelBtn = this.form.cancel(); 
    formCancelBtn.addEventListener("click",()=>{
      this.closeModal(); 
    })

 }
}

const dom = new DOM; 
export default dom


