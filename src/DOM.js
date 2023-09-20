import "./styles/main.css";
import TaskForm from "./taskForm";
import Task from "./task";
import { expandSideBar, collapseSideBar, createNewProjectInput, removeActiveProject} from "./utils";

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
    this.projectsParent = document.querySelector(".projects-all-container") 
  }

  /**
   * @param {import("./form").TaskParams} taskParams 
   */
  addTask({ title, dueDate, priority }){
    const task = new Task(title, dueDate, priority);
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
        return;
      }
      collapseSideBar(icon, this.sidebarContainer); 
    })
    this.sideBarTodayTasks.addEventListener("click",()=>{
      console.log("hi, clicked tpdau task"); 
    })
    this.sideBarWeeklyTask.addEventListener("click", ()=>{
      console.log("weekly tasks");
    });
    this.sideBarProjects.addEventListener("click",()=>{
      const icon = this.sidebarIcon.querySelector(".side-bar-svg"); 
      if(icon.classList.contains("collapse-icon")){
        expandSideBar(icon, this.sidebarContainer)
      }else if(this.projectsParent.classList.contains("active")){
        // basically need to do nothing but need newProjectInput.focus() -cant access it so would need like a promise? 
        return;
      }
      createNewProjectInput();  
    })
   
 }

}

const dom = new DOM; 
export default dom


