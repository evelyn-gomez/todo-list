import "./styles/main.css";
import { DateTime } from "luxon"; 


const tasksContainer = document.querySelector(".tasks"); 
// client-side form validation - NEEDED

const priorities = ["low", "medium", "high"]; 
function setDueDate(date){
  if(date === ""){
    // might want to uninstall luxon and install date-fns instead -- recommended library from TOP 
    const today = DateTime.now(DateTime.DATE_SHORT)
    const tomorrow = today.plus({ days: 1 }).toLocaleString();
    return tomorrow;
  } 
  // formatted date to 'MM/DD/YYYY' 
  const formattedDate = new Date(date).toLocaleDateString(); 
  return formattedDate; 
}

function convertDueDateFormat(inputDate){
  let [month, day, year] = inputDate.split("/");

  if(month.length === 1){
    month = `0${month}`;
  }

  if(day.length === 1){
    day = `0${day}`; 
  }

  const updatedDate  = `${year}-${month}-${day}`;
  console.log(updatedDate);
  return updatedDate; 
}

// /** @param {Element} title */
// function validateTitle(title){
//   if()
// }

export default class Task {
  get edit(){
    const button = document.createElement("button");
    button.textContent = "Edit"; 
    return button; 
  }

  constructor(title, description, dueDate, priority ) {
    this.title = title;
    this.description = description;
    this.dueDate = setDueDate(dueDate); 
    this.priority = priority; 
    this.editBtn = this.edit;  
  }

  addToDOM(){
    const taskDiv = document.createElement("div"); 
    taskDiv.classList.add("task"); 

    const domTitle = document.createElement("input");
    const domDescription = document.createElement("textarea");
    const domDueDate = document.createElement("input");
    const domPriority = document.createElement("select"); 
    

    domTitle.classList.add("title-item");
    domDescription.classList.add("description-item");
    domDueDate.classList.add("dueDate-item"); 
    domPriority.classList.add("priority-item");

    domTitle.type = "text"; 
    domDueDate.type = "date"; 
    
    domTitle.setAttribute("readonly", "readonly");
    domDescription.setAttribute("readonly", "readonly"); 
    domDueDate.setAttribute("readonly", "readonly"); 
    domPriority.setAttribute("disabled","disabled"); 

    domTitle.value = this.title;
    domTitle.textContent = domTitle.value; 
    domDescription.textContent = this.description;
    const dueDateInInputFormat = convertDueDateFormat(this.dueDate)
    domDueDate.value = dueDateInInputFormat;
    
    priorities.forEach(priority =>{
      const option = document.createElement("option");
      option.value = priority; 
      option.textContent = priority; 
      domPriority.appendChild(option); 
    })

    taskDiv.appendChild(domTitle); 
    taskDiv.appendChild(domDescription);
    taskDiv.appendChild(domDueDate);
    taskDiv.appendChild(domPriority);
    taskDiv.appendChild(this.editBtn); 

    tasksContainer.appendChild(taskDiv);
    
    const taskDomItems = [domTitle, domDescription, domDueDate, domPriority]; 
    console.log(taskDomItems);

    this.editBtn.addEventListener("click", ()=>{
      console.log("poked"); 
      if(this.editBtn.textContent === "Edit"){
        this.editBtn.textContent = "Save";
        domTitle.removeAttribute("readonly", "readonly");
        domDescription.removeAttribute("readonly", "readonly");
        domDueDate.removeAttribute("readonly", "readonly");
        domPriority.removeAttribute("disabled","disabled");
        domTitle.focus();
      }else{
        // const titleValidated = validateTitle(domTitle);
        if(domTitle.value.length < 2 || domTitle.value.length > 20){
          alert(`Title length cannot be shorter than 2 char or longer than 20 char - your title is ${domTitle.value.length} char long`); 
          return; 
        }
        this.editBtn.textContent = "Edit"
        domTitle.setAttribute("readonly", "readonly");
        domDescription.setAttribute("readonly", "readonly"); 
        domDueDate.setAttribute("readonly", "readonly"); 
        domPriority.setAttribute("disabled","disabled"); 
      }
    })
  }
};