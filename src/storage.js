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
   const taskIndex = this.inbox.findIndex(inboxTask => inboxTask.title === task.title); 
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

  static addProjectTasks(project, ...taskParams){
    for(const params of taskParams){
      const task = new Task(params); 
      const activeProject = this.projects.find(proj => proj === project);
      activeProject.setTask(task); 
    }
    this.store(); 
  }

  static addProjects(...projects){
    for(const proj of projects){
      const project = new Project(proj.name); 
      project.addToDOM(); 
      this.projects.push(project);
      project.setAllTasks(proj.tasks)
    }
    this.store()
  }


  static deleteProject(project){
    const projectIndex = this.projects.findIndex(proj => proj.name === project.name)
    this.projects.splice(projectIndex,1); 
    this.store(); 
  }

  static updateTaskInProject(activeSideMenuItem,taskToFind,taskParams){
    const project = Storage.projects.find(proj => proj.name === activeSideMenuItem.id);
    const indexOfTask = project.tasks.findIndex(task => task.title === taskToFind.title); 
    const newTask = new Task(taskParams); 
    project.tasks.splice(indexOfTask, 1, newTask); 
    // project.updateTask(task, taskParams); 
    this.store();
  }

  /**
   * 
   * @param {Element} activeSideMenuItem 
   * @param {Task} task 
   */
  static deleteTaskInProject(activeSideMenuItem, taskToDelete){
    const project = Storage.projects.find(proj => proj.name === activeSideMenuItem.id);
    const indexOfTask = project.tasks.findIndex(task => task.title === taskToDelete.title); 
    project.tasks.splice(indexOfTask, 1); 
    this.store(); 
  }
};


