"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const restify = require("restify");
const restify_contact_router_1 = require("../routes/restify-contact-router");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
let RestifyApplication = class RestifyApplication {
    constructor(restifyContactRouter) {
        this.restifyContactRouter = restifyContactRouter;
        console.log("RestifyApplication ctor");
        // create restify server
        this.restifyApplication = restify.createServer();
        restify.CORS.ALLOW_HEADERS.push("authorization");
        this.restifyApplication.use(restify.CORS());
        this.restifyApplication.use(restify.pre.sanitizePath());
        this.restifyApplication.use(restify.acceptParser(this.restifyApplication.acceptable));
        this.restifyApplication.use(restify.bodyParser());
        this.restifyApplication.use(restify.queryParser());
        this.restifyApplication.use(restify.authorizationParser());
        this.restifyApplication.use(restify.fullResponse());
        // configure API and error routes
        this.restifyContactRouter.configApiRoutes(this.restifyApplication);
        this.restifyContactRouter.configErrorRoutes(this.restifyApplication);
    }
    bootstrap(port) {
        let server = this.restifyApplication;
        // listen on provided ports
        server.listen(port, () => {
            console.log("%s listening at %s", server.name, server.url);
        });
    }
};
RestifyApplication = __decorate([
    aurelia_dependency_injection_1.inject(restify_contact_router_1.RestifyContactRouter)
], RestifyApplication);
exports.RestifyApplication = RestifyApplication;
//# sourceMappingURL=restify-application.js.map