import {inject} from "aurelia-dependency-injection";
import {ExpressApplication} from "./express-application";
import {RestifyApplication} from "./restify-application";
import {HapiApplication} from "./hapi-application";
import * as _ from "lodash";

@inject(ExpressApplication, RestifyApplication, HapiApplication)
export class NodeJsFrameworkFactory {
    private frameworkInstances: any;
    constructor(private expressApplication: ExpressApplication, private restifyApplication: RestifyApplication,
    private hapiApplication: HapiApplication) {
        console.log("NodeJsFramework ctor");
        this.frameworkInstances = {};
        for(let argument of arguments) {
            let typeName:string = _.startCase(argument.constructor.name);
            this.frameworkInstances[`${typeName}`] = argument;
        }
  }
    public createNodeJsFramework(restFramework: string) : any {
        return (restFramework) ? this.frameworkInstances[_.startCase(`${restFramework} Application`)] :
            this.frameworkInstances["Express Application"];
    }
}