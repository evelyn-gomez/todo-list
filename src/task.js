import Storage from "./storage";
import { enableEditing, setDueDate, convertDueDateFormat, priorities as PRIORITIES, taskClassesforItems as TASK_CLASSES_FOR_ITEMS, disableEditing, updateCheckedStatusClass, getCurrentOption} from "./utils";

// let taskId = 0;
// function nextTaskId() {
//   taskId += 1;
//   return taskId;
// }

/** @typedef {import("./taskForm").TaskParams} TaskParams */

export default class Task {

  /**
   * @param {TaskParams} params 
   */
  constructor({ title, dueDate, priority, done, }) {
    // this.id = id;
    this.title = title;
    this.dueDate = setDueDate(dueDate); 
    this.priority = priority; 
    if(done === undefined ){
      this.done = false; 
    }else{
      this.done = done; 
    }
  }

  /**
   * @returns {object}
   */
  serialize() {
    const { title, dueDate, priority, done,} = this; 
    return { title, dueDate, priority, done};
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

    DOMDueDate.setAttribute("readonly", "readonly"); 
    DOMPriority.setAttribute("disabled","disabled"); 
    
    DOMTitle.textContent = this.title;
    DOMTitle.value = DOMTitle.textContent; 
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

    // taskDiv.addEventListener("keyup", (e)=>{
    //   if(e.key === "Enter"){
    //     // e.preventDefault(); 
    //     disableEditing(this.toggleEditBtn,taskDOMDivs,taskDOMItems);
    //   }
    // })

    this.toggleEditBtn.addEventListener("click", ()=>{
      if(this.isEditing) {
        disableEditing(this.toggleEditBtn, taskDOMDivs, taskDOMItems);
        const params = {
          title: DOMTitle.value,
          dueDate: DOMDueDate.value,
          priority: DOMPriority.value,
          done: DOMTaskCompleted.checked,
        }   
        const activeSideMenuItem = getCurrentOption();
        if(activeSideMenuItem.id === "inbox"){
          Storage.updateTask(this, params);
          this.isEditing = false;
        }else{
          Storage.updateTaskInProject(activeSideMenuItem, this, params);
          this.isEditing = false;
        }
      }else {
        enableEditing(this.toggleEditBtn, taskDOMDivs, taskDOMItems); 
        DOMTitle.focus()
        this.isEditing = true;
      }
    });
    
    this.deleteBtn.addEventListener("click", ()=>{
      taskDiv.style.opacity =  "0"; 
      setTimeout(() => {
        const activeSideMenuItem = getCurrentOption();
        if(activeSideMenuItem.id === "inbox"){
          Storage.deleteTask(this);
        }else{
          Storage.deleteTaskInProject(activeSideMenuItem, this);
        }
        tasksContainer.removeChild(taskDiv); 
      }, 500);
    })
   
    DOMTaskCompleted.addEventListener("click", ()=>{ 
      updateCheckedStatusClass(DOMTaskCompleted, taskDOMItems);
      const params = {
        title: DOMTitle.value,
        dueDate: DOMDueDate.value,
        priority: DOMPriority.value,
        done: DOMTaskCompleted.checked
      }
      const activeSideMenuItem = getCurrentOption(); 
      if(activeSideMenuItem.id === "inbox"){
        Storage.updateTask(this,params)
      }else{
        Storage.updateTaskInProject(activeSideMenuItem,this,params); 
      }
    })

    if(this.done && DOMTaskCompleted.checked === false){
      DOMTaskCompleted.checked = true; 
      updateCheckedStatusClass(DOMTaskCompleted, taskDOMItems);
    }

    taskDiv.appendChild(DOMTaskCompleteDiv); 
    taskDiv.appendChild(DOMTitleDiv); 
    taskDiv.appendChild(DOMDueDateDiv);
    taskDiv.appendChild(DOMPriorityDiv);
    taskDiv.appendChild(buttonsDiv); 
    
    tasksContainer.appendChild(taskDiv);
  }
};