import Storage from "./storage";
import "./styles/main.css";
import { enableEditing, setDueDate, convertDueDateFormat, priorities as PRIORITIES, taskClassesforItems as TASK_CLASSES_FOR_ITEMS, disableEditing } from "./utils";

let taskId = 1;
function nextTaskId() {
  taskId += 1;
  return taskId;
}

/** @typedef {import("./taskForm").TaskParams} TaskParams */

export default class Task {
  /**
   * @param {TaskParams} params 
   */
  constructor({ id = nextTaskId(), title, dueDate, priority, done }) {
    this.id = id;
    this.title = title;
    this.dueDate = setDueDate(dueDate); 
    this.priority = priority; 
    this.done = done;
  }
  
  /**
   * @returns {object}
   */
  serialize() {
    const { title, dueDate, priority, done } = this;
    return { title, dueDate, priority, done };
  }

  /**
   * @param {TaskParams} params 
   */
  update({ title, dueDate, priority, done }) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = done;
  }

  addToDOM(){
    const tasksContainer = document.querySelector(".tasks"); 
    const taskDiv = document.createElement("div"); 
    taskDiv.classList.add("task"); 
    const buttonsDiv = document.createElement("div"); 
    buttonsDiv.id = "task-buttons"; 
  
    const DOMTaskCompleteDiv = document.createElement("div");
    const DOMTaskCompleted = document.createElement("input");
    const DOMTaskCompletedLabel = document.createElement("label");
    DOMTaskCompleted.type = "checkbox";  
    DOMTaskCompletedLabel.setAttribute("for", "checkbox"); 

     

    const DOMTitleDiv = document.createElement("div"); 
    DOMTitleDiv.setAttribute("class", TASK_CLASSES_FOR_ITEMS[1]); 
    const DOMTitleLabel = document.createElement("label");
    const DOMTitle = document.createElement("input");
    
    // const DOMDescriptionDiv = document.createElement("div"); 
    // const DOMDescriptionLabel = document.createElement("label"); 
    // const DOMDescription = document.createElement("textarea");
    
    const DOMDueDateDiv = document.createElement("div");
    const DOMDueDateLabel = document.createElement("label"); 
    const DOMDueDate = document.createElement("input");
    
    const DOMPriorityDiv = document.createElement("div");
    const DOMPriorityLabel = document.createElement("label"); 
    const DOMPriority = document.createElement("select");

    DOMTaskCompleteDiv.appendChild(DOMTaskCompletedLabel);
    DOMTaskCompleteDiv.appendChild(DOMTaskCompleted); 

    DOMTitleDiv.appendChild(DOMTitleLabel); 
    DOMTitleDiv.appendChild(DOMTitle); 

    // DOMDescriptionDiv.appendChild(DOMDescriptionLabel);
    // DOMDescriptionDiv.appendChild(DOMDescription); 

    DOMDueDateDiv.appendChild(DOMDueDateLabel); 
    DOMDueDateDiv.appendChild(DOMDueDate); 

    DOMPriorityDiv.appendChild(DOMPriorityLabel);
    DOMPriorityDiv.appendChild(DOMPriority); 

    const taskDOMDivs = [DOMTaskCompleteDiv, DOMTitleDiv, DOMDueDateDiv, DOMPriorityDiv]; 
    const taskDOMItems = [DOMTitle, DOMDueDate, DOMPriority]; 
   
    taskDOMDivs.forEach(item =>{ 
      const index = taskDOMDivs.indexOf(item); 
      const classname = TASK_CLASSES_FOR_ITEMS[index]; 
      item.classList.add(classname); 
    })

    DOMTitle.type = "text"; 
    DOMDueDate.type = "date"; 

    DOMTaskCompleted.setAttribute("id", "check-item"); 
    DOMTitle.setAttribute("readonly", "readonly");
    DOMTitle.setAttribute("required", "true"); 
    DOMTitle.setAttribute("minlength", "2");
    DOMTitle.setAttribute("maxlength", "20"); 
    // DOMDescription.setAttribute("readonly", "readonly")
    // DOMDescription.setAttribute("rows", "10"); 
    // DOMDescription.setAttribute("cols", "50");  
    DOMDueDate.setAttribute("readonly", "readonly"); 
    DOMPriority.setAttribute("disabled","disabled"); 
    
    DOMTitle.textContent = this.title;
    DOMTitle.value = DOMTitle.textContent; 
    // DOMDescription.textContent = this.description;
    DOMDueDate.value = convertDueDateFormat(this.dueDate);

    PRIORITIES.forEach(priority =>{
      const option = document.createElement("option");
      option.value = priority; 
      option.textContent = priority; 
      DOMPriority.appendChild(option);
      if(this.priority === priority){
        option.setAttribute("selected", "selected"); 
      } 
    })

    this.toggleEditBtn = document.createElement("button");
    this.toggleEditBtn.classList.add("edit-btn")
    this.toggleEditBtn.textContent = "Edit"; 

    this.deleteBtn = document.createElement("button"); 
    this.deleteBtn.classList.add("delete-btn")
    this.deleteBtn.textContent = "Delete"; 

    buttonsDiv.appendChild(this.toggleEditBtn);
    buttonsDiv.appendChild(this.deleteBtn); 

    taskDiv.addEventListener("keyup", (e)=>{
      if(e.key === "Enter"){
        e.preventDefault(); 
        disableEditing(this.toggleEditBtn,taskDOMDivs,taskDOMItems);
        DOMTitle.focus()
      }
    })

    this.toggleEditBtn.addEventListener("click", ()=>{
      if (this.isEditing) {
        disableEditing(this.toggleEditBtn, taskDOMDivs, taskDOMItems);
        const params = {
          title: DOMTitle.value,
          dueDate: DOMDueDate.value,
          priority: DOMPriority.value,
          done: DOMTaskCompleted.checked,
        }
        Storage.updateTask(this, params);
        this.isEditing = false;
      } else {
        enableEditing(this.toggleEditBtn, taskDOMDivs, taskDOMItems); 
        DOMTitle.focus()
        this.isEditing = true;
      }
    });
    
    this.deleteBtn.addEventListener("click", ()=>{
      taskDiv.style.opacity =  "0"; 
      setTimeout(() => {
        tasksContainer.removeChild(taskDiv); 
      }, 500);
    })

    DOMTaskCompleted.addEventListener("click", ()=>{ 
      if(!DOMTaskCompleted.classList.contains("green")){ 
        DOMTaskCompleted.classList.add("green"); 
        taskDOMItems.forEach(item =>{
          item.classList.add("completed-task"); 
        })
      } else if(taskDOMItems[0].classList.contains("completed-task")) {
        DOMTaskCompleted.classList.remove("green"); 
        taskDOMItems.forEach(item =>{
          item.classList.remove("completed-task"); 
        })
      }
    })

    taskDiv.appendChild(DOMTaskCompleteDiv); 
    taskDiv.appendChild(DOMTitleDiv); 
    taskDiv.appendChild(DOMDueDateDiv);
    taskDiv.appendChild(DOMPriorityDiv);
    taskDiv.appendChild(buttonsDiv); 
    
    tasksContainer.appendChild(taskDiv);
  }
};