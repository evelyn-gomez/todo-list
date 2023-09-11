import "./styles/main.css";
import TaskForm from "./form";
import Task from "./task";
import { addHeadersofMenu, removeHeadersOfMenu } from "./utils";

class DOM {
  constructor(){
    // home and overlay containers 
    this.homepage = document.querySelector(".homepage");
    this.content = document.querySelector(".content"); 
    this.modalBtn = document.querySelector(".open-modal button");
    this.modalBtn.textContent = "New Task";
    this.overlayDiv = document.querySelector(".overlay-modal");
    this.modalParent = document.querySelector(".modal-parent");
    this.form = document.querySelector("#task-form");  
    this.title = document.querySelector("#title"); 
    this.sidebarContainer = document.querySelector(".side-bar-main"); 
    this.sidebarIcon = document.querySelector(".side-bar-icon"); 
    this.sidebarMenu = document.querySelector(".side-bar-menu");
    this.sideBarTodayTasks = this.sidebarMenu.querySelector(".today-tasks svg"); 
    this.sideBarWeeklyTask = this.sidebarMenu.querySelector(".weekly-tasks svg"); 
    this.sideBarProjects = this.sidebarMenu.querySelector(".projects svg"); 
  }

  /**
   * @param {import("./form").TaskParams} taskParams 
   */
  addTask({ title, description, dueDate, priority }){
    const task = new Task(title, description, dueDate, priority);
    task.addToDOM();
    this.closeModal()
  }

 openModal(){
  this.overlayDiv.classList.remove("hidden"); 
  this.modalParent.classList.remove("hidden"); 
  this.title.focus()
 }

 closeModal(){
  this.modalParent.classList.add("hidden"); 
  this.overlayDiv.classList.add("hidden"); 
 }

 initialListeners(){
    this.modalBtn.addEventListener("click", ()=>{
        this.openModal();
    });
    this.overlayDiv.addEventListener("click", ()=>{
      this.closeModal(); 
    });
    this.form = new TaskForm({
      onSubmit: (...args) => this.addTask(...args)
    });
    const formCancelBtn = this.form.cancel(); 
    formCancelBtn.addEventListener("click",()=>{
      this.closeModal(); 
    })
    this.sidebarIcon.addEventListener("click", ()=>{
      const icon = this.sidebarIcon.querySelector(".side-bar-svg"); 
      const menuDiv = this.sidebarContainer.querySelector(".side-bar-menu"); 
      const childrenofMenu = menuDiv.children;
      if(icon.classList.contains("collapse-icon")){
        icon.classList.remove("collapse-icon");
        this.sidebarContainer.classList.remove("collapse"); 
        addHeadersofMenu(childrenofMenu); 
        return;
      }
      this.sidebarContainer.classList.add("collapse");
      icon.classList.add("collapse-icon"); 
      removeHeadersOfMenu(childrenofMenu);
    })
    this.sideBarTodayTasks.addEventListener("click",()=>{
      console.log("hi, clicked tpdau task"); 
    })
    this.sideBarWeeklyTask.addEventListener("click", ()=>{
      console.log("weekly tasks");
    });
    this.sideBarProjects.addEventListener("click",()=>{
      console.log("projects"); 
    })
 }

}

const dom = new DOM; 
export default dom


