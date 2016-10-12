import {ExpressApplication} from "./express-application";
import {RestifyApplication} from "./restify-application";
import {HapiApplication} from "./hapi-application";
import * as _ from "lodash";

export class NodeJsFrameworkFactory {
    private frameworkInstances: any[];
    constructor() {
        console.log("NodeJsFramework ctor");
        this.frameworkInstances = new Array(arguments.length);
        this.frameworkInstances["Express Application"] = new ExpressApplication();
        this.frameworkInstances["Hapi Application"] = new HapiApplication();
        this.frameworkInstances["Restify Application"] = new RestifyApplication();
  }
    public createNodeJsFramework(restFramework: string) : any {
        return (restFramework) ? this.frameworkInstances[_.startCase(`${restFramework} Application`)] :
            this.frameworkInstances["express Application"];
    }
}