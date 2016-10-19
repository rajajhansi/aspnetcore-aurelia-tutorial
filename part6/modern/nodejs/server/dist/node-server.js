"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
const nodejs_framework_factory_1 = require("./contact-manager/bootstrap/nodejs-framework-factory");
let NodeServer = class NodeServer {
    constructor(nodejsFrameworkFactory) {
        this.nodejsFrameworkFactory = nodejsFrameworkFactory;
        console.log("NodeServer ctor");
    }
    normalizePort(val) {
        "use strict";
        let port = parseInt(val, 10);
        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }
    bootstrap() {
        // get port from environment and store in Express.
        let port = this.normalizePort(process.env.PORT || 8080);
        let restFramework = process.env.REST_FRAMEWORK || "express";
        let server = this.nodejsFrameworkFactory.createNodeJsFramework(restFramework);
        server.bootstrap(port);
    }
};
NodeServer = __decorate([
    aurelia_dependency_injection_1.inject(nodejs_framework_factory_1.NodeJsFrameworkFactory)
], NodeServer);
exports.NodeServer = NodeServer;
//# sourceMappingURL=node-server.js.map