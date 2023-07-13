import './styles/main.css'; 
import { DateTime } from 'luxon';

//task form and input values
let taskForm = document.querySelector('.task-form'); 
// will be the form add/submit and cancel button 
let submitTaskFormBtn = document.querySelector('.form-submit #add-button'); 
let cancelBtn = document.querySelector('.form-submit #cancel-button');
let testerTitle = 'Get Task to work'; 
let testerDescription = 'I need the er to work -- then values from element working'; 
let testerDueDate = DateTime.now().toLocaleString(); 

export function submitForm(){
  submitTaskFormBtn.addEventListener('submit', ()=>{
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;
    let dueDate = document.querySelector('#dueDate').value;
    let task = new Task(title, description, dueDate); 
  })
} 

export class Task {
  /**@type Input Element */
  title; 
  /**@type Input Element */
  description; 
  /**@type Input Element */
  dueDate;
  // /**@type Select Element */ 
  // priority;  
  constructor(title, description, dueDate){
    this.title = title;  
    this.description = description; 
    this.dueDate = dueDate;   
    // this.priority = document.querySelector('.priortity'); 
  }
}

//export let task = new Task() <-- should be called else where as in I hit form button --- i fill form -- when form (add) button submitted ---- taskSubmit.addEventListener('submit', ()=>{ here a check form validation --- there should also be form validation before hitting submit, then once form validated then create newTask = new Task() by setting up title = document.querySelector(title).value then let newTask = new Task(title)-----------------------------------}) 

