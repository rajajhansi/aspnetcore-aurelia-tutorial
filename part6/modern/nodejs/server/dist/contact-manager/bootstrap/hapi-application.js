"use strict";
const Hapi = require("hapi");
const Boom = require("Boom");
const in_memory_contact_service_1 = require("../services/in-memory-contact-service");
class HapiApplication {
    constructor() {
        console.log("HapiApplication ctor");
        // create expressjs application
        this.hapiApplication = new Hapi.Server();
        this.contactService = new in_memory_contact_service_1.InMemoryContactService();
    }
    configErrorRoutes() {
        // catch 404 and forward to error handler
        this.hapiApplication.ext("onPreResponse", (request, reply) => {
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
    configApiRoutes() {
        var endpoint = "/api/contacts";
        this.hapiApplication.route({
            path: endpoint,
            method: "GET",
            handler: (request, reply) => {
                this.contactService.getAll().then((contacts) => {
                    reply(contacts);
                });
            } });
    }
    bootstrap(port) {
        this.hapiApplication.connection({ port: port });
        // configure error routes
        this.configErrorRoutes();
        // configure API routes
        this.configApiRoutes();
        this.hapiApplication.start(() => {
            console.log("Listening on " + this.hapiApplication.info.uri);
        });
    }
}
exports.HapiApplication = HapiApplication;
//# sourceMappingURL=hapi-application.js.map