"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Hapi = require("hapi");
const hapi_contact_router_1 = require("../routes/hapi-contact-router");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
let HapiApplication = class HapiApplication {
    constructor(hapiContactRouter) {
        this.hapiContactRouter = hapiContactRouter;
        console.log("HapiApplication ctor");
        // create expressjs application
        this.hapiApplication = new Hapi.Server();
    }
    bootstrap(port) {
        this.hapiApplication.connection({ port: port });
        // configure error routes
        this.hapiContactRouter.configErrorRoutes(this.hapiApplication);
        // configure API routes
        this.hapiContactRouter.configApiRoutes(this.hapiApplication);
        this.hapiApplication.start(() => {
            console.log("Listening on " + this.hapiApplication.info.uri);
        });
    }
};
HapiApplication = __decorate([
    aurelia_dependency_injection_1.inject(hapi_contact_router_1.HapiContactRouter)
], HapiApplication);
exports.HapiApplication = HapiApplication;
//# sourceMappingURL=hapi-application.js.map