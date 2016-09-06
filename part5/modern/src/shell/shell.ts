import {Router, RouterConfiguration, NavigationInstruction} from "aurelia-router";

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Modern";
    config.addPipelineStep("authorize", ToastNavResult);
    config.map([
      { route: "", redirect: "contactmanager"},
      { route: "contactmanager", name:"contactmanager", moduleId: "contact-manager/index", nav: true, title: "Contact Manager" },
      { route: "taskmanager", name: "taskmanager",      moduleId: "task-manager/index",    nav: true, title: "Task Manager" }
    ]);

    this.router = router;
  }
}

class ToastNavResult {
    run(navigationInstruction: NavigationInstruction, next: Function) {
        console.log("Inside run");
        return next().then((a: any) => { console.log(a.status); /*toastr.info(a.status);*/ return a;});
    }
}