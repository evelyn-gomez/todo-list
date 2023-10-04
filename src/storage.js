import Task from "./task";
import { getCurrentOption } from "./utils";
import Project from "./project";

/** @typedef {{ id: string; title: string; dueDate: string; priority: string; done: boolean; }} TaskParams */
/** @typedef {{ id: number; name: string; tasks: TaskParams[] }} Project */

export default class Storage {
  static key = "stored";

  /** @type {Task[]} */
  static inbox = [];

  /** @type {Project[]} */
  static projects = [];

  static store() {
    const inbox = this.inbox.map(task => task.serialize()); 
    const projects = this.projects.map(proj => proj.serialize());
    localStorage.setItem(this.key, JSON.stringify({ inbox, projects}));
    console.log(inbox, projects, "storage.store");
  }

  static load() {
    // localStorage.clear();
    const data = JSON.parse(localStorage.getItem(this.key));
    if (data) {
      console.log(data.inbox, "storage.load");
      this.addTasks(...data.inbox);
      // this.addProjects(...data.projects);
    }
  }

  static addTasks(...taskParams) {
    const inboxOrProject = getCurrentOption();
    if(inboxOrProject.id === "inbox"){
      for (const params of taskParams) {
        const task = new Task(params);
        // add to inbox or project? 
        this.inbox.push(task);
        task.addToDOM();
      }
      this.store();
    }
    console.log(inboxOrProject.id); 
  }

  /**
   * @param {Task} task 
   * @param {TaskParams} params 
   */
  static updateTask(task, params) { 
    task.update(params);
    this.store(task)
  }

  /**
   * 
   * @param {Task} task 
   *
   */
  static deleteTask(task){
   const taskIndex = this.inbox.findIndex(inboxTask => inboxTask.id === task.id); 
   this.inbox.splice(taskIndex,1); 
   this.store();
  }

  // static addTasksToProject(){
     
  // }

  static addProject(proj){
    this.projects.push(proj); 
  }

  // static updateProject(project, {tasks, params}){
  //   for (const proj of projects) {
  //     this.projects.push(proj);
  //     new Project(proj.name, proj.tasks).addToDOM();
  //   }
  // } 

  // static deleteProject(project){
  //   // whole project
  // }

  // static deleteTaskInProject(){

  // }
};


