import {Router, RouterConfiguration} from "aurelia-router";

export class Shell {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Modern";
    config.map([
      { route: "", redirect: "contactmanager"},
      { route: "contactmanager", name:"contactmanager", moduleId: "contact-manager/index", nav: true, title: "Contact Manager" },
      { route: "taskmanager", name: "taskmanager",      moduleId: "task-manager/index",    nav: true, title: "Task Manager" }
    ]);

    this.router = router;
  }
}