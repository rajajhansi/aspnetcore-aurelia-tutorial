"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
const express_application_1 = require("./express-application");
const restify_application_1 = require("./restify-application");
const hapi_application_1 = require("./hapi-application");
const _ = require("lodash");
let NodeJsFrameworkFactory = class NodeJsFrameworkFactory {
    constructor(expressApplication, restifyApplication, hapiApplication) {
        this.expressApplication = expressApplication;
        this.restifyApplication = restifyApplication;
        this.hapiApplication = hapiApplication;
        console.log("NodeJsFramework ctor");
        this.frameworkInstances = {};
        for (let argument of arguments) {
            let typeName = _.startCase(argument.constructor.name);
            this.frameworkInstances[`${typeName}`] = argument;
        }
    }
    createNodeJsFramework(restFramework) {
        return (restFramework) ? this.frameworkInstances[_.startCase(`${restFramework} Application`)] :
            this.frameworkInstances["Express Application"];
    }
};
NodeJsFrameworkFactory = __decorate([
    aurelia_dependency_injection_1.inject(express_application_1.ExpressApplication, restify_application_1.RestifyApplication, hapi_application_1.HapiApplication)
], NodeJsFrameworkFactory);
exports.NodeJsFrameworkFactory = NodeJsFrameworkFactory;
//# sourceMappingURL=nodejs-framework-factory.js.map