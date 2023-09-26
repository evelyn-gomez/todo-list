import Task from "./task";

/** @typedef {{ title: string; dueDate: string; priority: string; done: boolean; }} Task */
/** @typedef {{ name: string; tasks: Task[] }} Project */

export default class Storage {
  static key = "stored";

  /** @type {Task[]} */
  static inbox = [];

  /** @type {Project[]} */
  static projects = [];

  static store() {
    const { inbox, projects } = this;
    console.log(inbox, projects);
    localStorage.setItem(this.key, JSON.stringify({ inbox, projects }));
  }

  static load() {
    const data = JSON.parse(localStorage.getItem(this.key));
    if (data) {
      console.log(data.inbox);
      this.addTasks(...data.inbox);
      // this.addProjects(...data.projects);
    }
  }

  static addTasks(...tasks) {
    for (const task of tasks) {
      this.inbox.push(task);
      new Task(task.title, task.dueDate, task.priority, task.done).addToDOM();
    }
    console.log(this.inbox);
  }

  static addProjects(...projects) {
    this.projects.concat(projects);
  }
};

