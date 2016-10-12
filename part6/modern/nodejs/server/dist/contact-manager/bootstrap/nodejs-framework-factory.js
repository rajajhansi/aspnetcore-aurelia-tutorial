"use strict";
const express_application_1 = require("./express-application");
const restify_application_1 = require("./restify-application");
const hapi_application_1 = require("./hapi-application");
const _ = require("lodash");
class NodeJsFrameworkFactory {
    constructor() {
        console.log("NodeJsFramework ctor");
        this.frameworkInstances = new Array(arguments.length);
        this.frameworkInstances["Express Application"] = new express_application_1.ExpressApplication();
        this.frameworkInstances["Hapi Application"] = new hapi_application_1.HapiApplication();
        this.frameworkInstances["Restify Application"] = new restify_application_1.RestifyApplication();
    }
    createNodeJsFramework(restFramework) {
        return (restFramework) ? this.frameworkInstances[_.startCase(`${restFramework} Application`)] :
            this.frameworkInstances["express Application"];
    }
}
exports.NodeJsFrameworkFactory = NodeJsFrameworkFactory;
//# sourceMappingURL=nodejs-framework-factory.js.map