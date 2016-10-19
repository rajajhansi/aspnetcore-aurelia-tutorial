"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const in_memory_contact_service_1 = require("../services/in-memory-contact-service");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
let RestifyContactRouter = class RestifyContactRouter {
    constructor(contactService) {
        this.contactService = contactService;
        console.log("RestifyContactRoutes ctor");
    }
    configErrorRoutes(restifyApplication) {
        // catch 404 and forward to error handler
        restifyApplication.on("NotFound", function (request, response, erorr, next) {
            console.log("Invalid Url");
            var customError = new Error("Not Found");
            response.send(404, customError);
            return next();
        });
    }
    configApiRoutes(restifyApplication) {
        var endpoint = "/api/contacts";
        restifyApplication.get(endpoint, ((request, response, next) => {
            this.contactService.getAll().then((contacts) => {
                response.json(contacts);
                return next();
            });
        }));
        restifyApplication.post(endpoint, ((request, response, next) => {
            this.contactService.save(request.body).then((contact) => response.json(contact));
            return next();
        }));
        restifyApplication.put(endpoint, ((request, response, next) => {
            this.contactService.save(request.body).then((contact) => response.json(contact));
            return next();
        }));
        restifyApplication.del(endpoint, ((request, response, next) => {
            this.contactService.delete(parseInt(request.body.id, 10)).then((contact) => response.json(contact));
            return next();
        }));
    }
};
RestifyContactRouter = __decorate([
    aurelia_dependency_injection_1.inject(in_memory_contact_service_1.InMemoryContactService)
], RestifyContactRouter);
exports.RestifyContactRouter = RestifyContactRouter;
//# sourceMappingURL=restify-contact-router.js.map