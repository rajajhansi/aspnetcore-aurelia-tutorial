"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Boom = require("Boom");
const in_memory_contact_service_1 = require("../services/in-memory-contact-service");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
let HapiContactRouter = class HapiContactRouter {
    constructor(contactService) {
        this.contactService = contactService;
        console.log("HapiApplication ctor");
    }
    configErrorRoutes(hapiApplication) {
        // catch 404 and forward to error handler
        hapiApplication.ext("onPreResponse", (request, reply) => {
            if (request.response.isBoom) {
                if (request.response.output.statusCode === 404) {
                    console.log("Invalid Url");
                    return reply(Boom.notFound("check your url"));
                }
                return reply(request.response);
            }
            return reply.continue();
        });
    }
    configApiRoutes(hapiApplication) {
        var endpoint = "/api/contacts";
        hapiApplication.route({
            path: endpoint,
            method: "GET",
            handler: (request, reply) => {
                this.contactService.getAll().then((contacts) => {
                    reply(contacts);
                });
            } });
        hapiApplication.route({
            path: endpoint,
            method: "POST",
            handler: (request, reply) => {
                this.contactService.save(request.payload).then((contact) => {
                    reply(contact);
                });
            } });
        hapiApplication.route({
            path: endpoint,
            method: "PUT",
            handler: (request, reply) => {
                this.contactService.save(request.payload).then((contact) => {
                    reply(contact);
                });
            } });
        hapiApplication.route({
            path: endpoint,
            method: "DELETE",
            handler: (request, reply) => {
                this.contactService.delete(parseInt(request.payload.id, 10)).then((contact) => {
                    reply(contact);
                });
            } });
    }
};
HapiContactRouter = __decorate([
    aurelia_dependency_injection_1.inject(in_memory_contact_service_1.InMemoryContactService)
], HapiContactRouter);
exports.HapiContactRouter = HapiContactRouter;
//# sourceMappingURL=hapi-contact-router.js.map