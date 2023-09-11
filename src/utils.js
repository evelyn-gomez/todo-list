import { DateTime } from "luxon";

export const taskClassesforItems = ["check-item", "title-item", "description-item", "dueDate-item", "priority-item"]; 
export const priorities = ["","low", "medium", "high"];

export function setDueDate(date){
  if(date === ""){
    // might want to uninstall luxon and install date-fns instead -- recomme  nded library from TOP 
    const today = DateTime.now(DateTime.DATE_SHORT)
    const tomorrow = today.plus({ days: 1 }).toLocaleString();
    return tomorrow;
  } 
  // formatted date to 'MM/DD/YYYY' 
  const formattedDate = new Date(date).toLocaleDateString(); 
  return formattedDate; 
}

export function convertDueDateFormat(inputDate){
  let [month, day, year] = inputDate.split("/");

  if(month.length === 1){
    month = `0${month}`;
  }

  if(day.length === 1){
    day = `0${day}`; 
  }

  const updatedDate  = `${year}-${month}-${day}`;
  return updatedDate; 
}

export const headersOfMenu = ["Today", "This Week", "Projects"]; 

export function addHeadersofMenu(childrenofMenu){
  // eslint-disable-next-line no-plusplus
  for(let i=0; i < childrenofMenu.length; i++){
    const child = childrenofMenu[i];
    child.classList.remove("narrow"); 
    child.querySelector("p").textContent = headersOfMenu[i]; 
  }
}

export function removeHeadersOfMenu(childrenofMenu){
  for(let i=0; i < childrenofMenu.length; i++){
    const child = childrenofMenu[i];
    child.classList.add("narrow");
    child.querySelector("p").textContent = ""; 
  }
}

export function removeFadeOut(el, time) {
  // eslint-disable-next-line no-param-reassign
  el.style.transition = `opacity ease-out`;
  // eslint-disable-next-line no-param-reassign
  el.style.opacity = 0;
  console.log("hello from fade"); 
  setTimeout(() => {
      el.parentNode.removeChild(el);
  }, time);
}


