import Task from "./task";
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
    const projects = this.projects.map(proj =>  proj.serialize());
    const inbox = this.inbox.map(task => task.serialize()); 
    localStorage.setItem(this.key, JSON.stringify({ inbox, projects}));
    console.log(inbox, projects, "storage.store");
  }

  static load() {
    // localStorage.clear();
    const data = JSON.parse(localStorage.getItem(this.key));
    if (data) {
      console.log(data.inbox, "storage.load");
      this.addInboxTasks(...data.inbox);
      this.addProjects(...data.projects);
    }
    // setDefaultInboxTasks(); 
  }

  static addInboxTasks(...taskParams){
    for(const params of taskParams){
      const task = new Task(params);
      this.inbox.push(task);
      task.addToDOM();
    }
    this.store();
  }

  /**
   * @param {Task} task 
   * @param {TaskParams} params 
   */
  static updateTask(task, params) { 
    task.update(params);
    this.store()
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

  /**
   * 
   * @param {Project} project 
   */
  static addProject(project){
    this.projects.push(project); 
    this.store()
  }

  // static addProjectTasks(project, ...taskParams){
  //   for(const params of taskParams){
  //     const task = new Task(params); 
  //     console.log(task); 
  //     const activeProject = this.projects.find(proj => proj === project);
  //     activeProject.setTask(task); 
  //   }
  //   this.store(); 
  // }

  static addProjects(...projects){
    for(const proj of projects){
      const project = new Project(proj.name); 
      project.addToDOM(); 
      this.projects.push(project);
      const allTask = project.getAllTasks();
      if(allTask.length >=1){
        this.addProjectTasks(project.tasks, project)
      }
    }
    this.store()
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


