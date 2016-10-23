import {Aurelia} from "aurelia-framework";
import {Router, RouterConfiguration, NavigationInstruction} from "aurelia-router";
import * as toastr from "toastr";
export class Index {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Aurelia Contact Manager";
    config.map([
      { route: "", moduleId: "task-manager/no-selection", nav: true, title: "Task Manager",  name:"taskmanager"  },
      { route: "tasks/:id", moduleId:"task-manager/task-detail", nave:true,  name:"tasks" }
    ]);

    this.router = router;
  }
}
