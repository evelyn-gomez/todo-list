import Project from "./project";
import Task from "./task";

/** @typedef {{ id: string; title: string; dueDate: string; priority: string; done: boolean; }} TaskParams */
/** @typedef {{ name: string; tasks: TaskParams[] }} Project */

export default class Storage {
  static key = "stored";

  /** @type {Task[]} */
  static inbox = [];

  /** @type {Project[]} */
  static projects = [];

  static store() {
    const inbox = this.inbox.map(task => task.serialize());
    const projects = this.projects.map(proj => proj.serialize());
    console.log(inbox, projects);
    localStorage.setItem(this.key, JSON.stringify({ inbox, projects }));
  }

  static load() {
    // localStorage.clear();
    const data = JSON.parse(localStorage.getItem(this.key));
    if (data) {
      console.log(data.inbox);
      this.addTasks(...data.inbox);
      // this.addProjects(...data.projects);
    }
  }

  static addTasks(...taskParams) {
    for (const params of taskParams) {
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
    this.store();
  }

  static addProjects(...projects) {
    for (const proj of projects) {
      this.projects.push(proj);
      // new Project(proj.name, proj.tasks).addToDOM();
    }
  }
};

