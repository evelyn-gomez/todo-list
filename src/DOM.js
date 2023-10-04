import "./styles/main.css";
import TaskForm from "./taskForm";
import Project from "./project";
import { expandSideBar, collapseSideBar, createNewProjectInput, removeActiveProject, disableProjectInput, setSideBarOption} from "./utils";
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
    this.sideBarInboxTasks = this.sidebarMenu.querySelector(".inbox-tasks"); 
    this.sideBarWeeklyTask = this.sidebarMenu.querySelector(".weekly-tasks"); 
    this.sideBarProjectsHeader = this.sidebarMenu.querySelector(".projects");
    this.projectsContainer = document.querySelector(".projects-all-container") 
    this.addProjectButton = this.projectsContainer.querySelector(".add-project-button"); 
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
        if(this.projectsContainer.classList.contains("active")){
          removeActiveProject(this.projectsContainer); 
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
      }if(this.projectsContainer.classList.contains("active")){
        removeActiveProject(this.projectsContainer); 
      }
      collapseSideBar(icon, this.sidebarContainer); 
    })
    this.sideBarInboxTasks.addEventListener("click",()=>{
      disableProjectInput(this.projectsContainer); 
      setSideBarOption(this.sideBarInboxTasks); 
      console.log("Inbox, Default")
    })
    this.sideBarWeeklyTask.addEventListener("click", ()=>{
      disableProjectInput(this.projectsContainer); 
      setSideBarOption(this.sideBarWeeklyTask);    
      console.log("weekly tasks");
    });
    this.sideBarProjectsHeader.addEventListener("click", ()=>{
      const icon = this.sidebarIcon.querySelector(".side-bar-svg"); 
      if(icon.classList.contains("collapse-icon")){
        expandSideBar(icon, this.sidebarContainer); 
      }
    })
    this.addProjectButton.addEventListener("click", ()=>{
      const icon = this.sidebarIcon.querySelector(".side-bar-svg"); 
      const projectsAddedLibrary = document.querySelector(".projects-added"); 
      if(icon.classList.contains("collapse-icon")){
        expandSideBar(icon, this.sidebarContainer)
      }else if(this.projectsContainer.classList.contains("active")){
        return; 
      }else if(projectsAddedLibrary.classList.contains("active")){
        return 
      }
      const tempProject = createNewProjectInput(); 
      tempProject.addBtn.addEventListener("click", ()=>{
        const newProject = new Project(tempProject.input.value)
        newProject.addToDOM(tempProject); 
      })
    })
  }

}

const dom = new DOM; 
export default dom


