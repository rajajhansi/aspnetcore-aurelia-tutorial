"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const express = require("express");
const bodyParser = require("body-parser");
const in_memory_contact_service_1 = require("../services/in-memory-contact-service");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
let ExpressContactRouter = class ExpressContactRouter {
    constructor(contactService) {
        this.contactService = contactService;
        this.contactRouter = express.Router();
    }
    configErrorRoutes(expressApplication) {
        // catch 404 error
        expressApplication.use(function (request, response, next) {
            response.status(404).send("Not Found");
        });
        // catch 500 error (Internal Server Error)
        expressApplication.use(function (err, request, response, next) {
            console.log("Application Error");
            response.sendStatus(500);
        });
    }
    configApiRoutes(expressApplication) {
        this.contactRouter.route("/contacts")
            .get((request, response) => {
            this.contactService.getAll().then((contacts) => {
                response.json(contacts);
            });
        })
            .post((request, response) => {
            this.contactService.save(request.body).then((contact) => response.json(contact));
        })
            .put((request, response) => {
            this.contactService.save(request.body).then((contact) => response.json(contact));
        })
            .delete((request, response) => {
            this.contactService.delete(parseInt(request.body.id, 10)).then((contact) => response.json(contact));
        });
        expressApplication.use("/api", bodyParser.json());
        expressApplication.use("/api", this.contactRouter);
    }
};
ExpressContactRouter = __decorate([
    aurelia_dependency_injection_1.inject(in_memory_contact_service_1.InMemoryContactService)
], ExpressContactRouter);
exports.ExpressContactRouter = ExpressContactRouter;
//# sourceMappingURL=express-contact-router.js.map