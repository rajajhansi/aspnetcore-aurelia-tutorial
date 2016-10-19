import {inject} from "aurelia-dependency-injection";
import {Lazy} from "aurelia-framework";
import {ExpressApplication} from "./express-application";
import {RestifyApplication} from "./restify-application";
import {HapiApplication} from "./hapi-application";
import * as _ from "lodash";

@inject(Lazy.of(ExpressApplication), Lazy.of(RestifyApplication), Lazy.of(HapiApplication))
export class NodeJsFrameworkFactory {
    private frameworkInstances: any;
    constructor(private getExpressApplication : () => ExpressApplication,
    private getRestifyApplication: () => RestifyApplication,
    private hapiApplication : () => HapiApplication) {
        console.log("NodeJsFramework ctor");
        let frameworks = ["Express Application", "Restify Application", "Hapi Application"];
        this.frameworkInstances = {};
        let i = 0;
        for(let argument of arguments) {
            let typeName:string = frameworks[i++];
            this.frameworkInstances[`${typeName}`] = argument;
        }
  }
    public createNodeJsFramework(restFramework: string) : any {
        return (restFramework) ? this.frameworkInstances[_.startCase(`${restFramework} Application`)] ():
            this.frameworkInstances["Express Application"] ();
    }
}