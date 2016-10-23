import {Aurelia} from "aurelia-framework";
import {Router, RouterConfiguration, NavigationInstruction} from "aurelia-router";
import * as toastr from "toastr";
export class Index {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Aurelia Contact Manager";
    config.map([
      { route: "", moduleId: "contact-manager/no-selection", nav: true, title: "Contact Manager",  name:"contactmanager"  },
      { route: "contacts/:id", moduleId:"contact-manager/contact-detail", nave:true,  name:"contacts" }
    ]);

    this.router = router;
  }
}
