import "./styles/main.css";
import TaskForm from "./taskForm";
import Task from "./task";
import { expandSideBar, collapseSideBar, createNewProjectInput, removeActiveProject, taskTester, taskTester2, } from "./utils";
import Storage from "./storage";

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
    this.sideBarInboxTasks = this.sidebarMenu.querySelector(".inbox-tasks svg"); 
    this.sideBarWeeklyTask = this.sidebarMenu.querySelector(".weekly-tasks svg"); 
    this.sideBarProjects = this.sidebarMenu.querySelector(".projects svg");
    this.projectsParent = document.querySelector(".projects-all-container") 
  }

  /**
   * @param {import("./taskForm").TaskParams} taskParams 
   */
  addTask({ title, dueDate, priority, done }){
    Storage.addTasks({ title, dueDate, priority, done });
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
  this.form.cancel();
 }

 initialListeners(){
    this.modalBtn.addEventListener("click", ()=>{
        if(this.projectsParent.classList.contains("active")){
          removeActiveProject(this.projectsParent); 
        }
        this.openModal();
    });
    this.overlayDiv.addEventListener("click", ()=>{
      this.closeModal(); 
    });
    this.form = new TaskForm({
      onSubmit: (...args) => this.addTask(...args)
    });
    const formCancelBtn = document.querySelector("#cancel-button"); 
    formCancelBtn.addEventListener("click",()=>{
      this.closeModal();
      this.form.cancel();
    })
    this.sidebarIcon.addEventListener("click", ()=>{
      const icon = this.sidebarIcon.querySelector(".side-bar-svg"); 
      if(icon.classList.contains("collapse-icon")){
        expandSideBar(icon, this.sidebarContainer); 
        return;
      }if(this.projectsParent.classList.contains("active")){
        removeActiveProject(this.projectsParent); 
      }
      collapseSideBar(icon, this.sidebarContainer); 
    })
    this.sideBarInboxTasks.addEventListener("click",()=>{
      if(this.projectsParent.classList.contains("active")){
        removeActiveProject(this.projectsParent);
      }
    })
    this.sideBarWeeklyTask.addEventListener("click", ()=>{
      if(this.projectsParent.classList.contains("active")){
        removeActiveProject(this.projectsParent);
      }
      console.log("weekly tasks");
    });
    this.sideBarProjects.addEventListener("click",()=>{
      const icon = this.sidebarIcon.querySelector(".side-bar-svg"); 
      if(icon.classList.contains("collapse-icon")){
        expandSideBar(icon, this.sidebarContainer)
      }else if(this.projectsParent.classList.contains("active")){
        //  
        return;
      } 
      createNewProjectInput();    
    })
    window.addEventListener("beforeunload", () => {
      Storage.store();
      console.log("refresing"); 
    })
 }

}

const dom = new DOM; 
export default dom


