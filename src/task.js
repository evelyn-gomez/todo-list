import "./styles/main.css";
import { editTask, removeTask } from "./handlers";
import { setDueDate, convertDueDateFormat, priorities as PRIORITIES, taskClassesforItems as TASK_CLASSES_FOR_ITEMS } from "./utils";

export default class Task {
  constructor(title, description, dueDate, priority ) {
    this.title = title;
    this.description = description;
    this.dueDate = setDueDate(dueDate); 
    this.priority = priority; 
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
    
    const DOMDescriptionDiv = document.createElement("div"); 
    const DOMDescriptionLabel = document.createElement("label"); 
    const DOMDescription = document.createElement("textarea");
    
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

    DOMDescriptionDiv.appendChild(DOMDescriptionLabel);
    DOMDescriptionDiv.appendChild(DOMDescription); 

    DOMDueDateDiv.appendChild(DOMDueDateLabel); 
    DOMDueDateDiv.appendChild(DOMDueDate); 

    DOMPriorityDiv.appendChild(DOMPriorityLabel);
    DOMPriorityDiv.appendChild(DOMPriority); 

    const taskDOMDivs = [DOMTaskCompleteDiv, DOMTitleDiv, DOMDescriptionDiv, DOMDueDateDiv, DOMPriorityDiv]; 
    const taskDOMItems = [DOMTitle, DOMDescription, DOMDueDate, DOMPriority]; 
   
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
    DOMDescription.setAttribute("readonly", "readonly")
    DOMDescription.setAttribute("rows", "10"); 
    DOMDescription.setAttribute("cols", "50");  
    DOMDueDate.setAttribute("readonly", "readonly"); 
    DOMPriority.setAttribute("disabled","disabled"); 
    
    DOMTitle.textContent = this.title;
    DOMTitle.value = DOMTitle.textContent; 
    DOMDescription.textContent = this.description;
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

    this.editBtn = document.createElement("button");
    this.editBtn.classList.add("edit-btn")
    this.editBtn.textContent = "Edit"; 

    this.deleteBtn = document.createElement("button"); 
    this.deleteBtn.classList.add("delete-btn")
    this.deleteBtn.textContent = "Delete"; 

    buttonsDiv.appendChild(this.editBtn);
    buttonsDiv.appendChild(this.deleteBtn); 

    this.editBtn.addEventListener("click", ()=>{
      editTask(this.editBtn,taskDOMDivs, taskDOMItems); 
    });

    this.deleteBtn.addEventListener("click", ()=>{
      removeTask(taskDiv)
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
    taskDiv.appendChild(DOMDescriptionDiv);
    taskDiv.appendChild(DOMDueDateDiv);
    taskDiv.appendChild(DOMPriorityDiv);
    taskDiv.appendChild(buttonsDiv); 
    
    tasksContainer.appendChild(taskDiv);

    return taskDiv;
  }
};