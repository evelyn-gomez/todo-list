import './styles/main.css'; 



export class Task {
  constructor(title){
      this.title = title; 
      this.description = description; 
      this.priority = priority; 
      this.dueDate = dueDate; 
  }
  view(){
  } 
  create(){
  }
  modify(){
  }
  description(){
    let desc = `this describes task`;
  }
  dueDate(){
    let dueDate = 'date due';
  }
  priority(){
    let priority = 'high low medium';
  }

}

export let task = new Task('simple-task', 'here is the description','low priorty', 'date due'); 

