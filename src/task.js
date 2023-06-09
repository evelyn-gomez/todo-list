// class Task {
//   taskDiv;
//   constructor(title){
//     this.taskDiv = document.createElement('div');
//     this.title = title;
//   }
//   description(){
//     let desc = `this describes task`;
//   }
//   dueDate(){
//     let dueDate = 'date due';
//   }
//   priority(){
//     let priority = 'high low medium';
//   }

// }
// let task = new Task();

export default function viewTask() {
  const taskDiv = document.querySelector(".task-card");
  const p = document.createElement("p");
  p.textContent = "this is the task card";
  taskDiv.appendChild(p);
}
