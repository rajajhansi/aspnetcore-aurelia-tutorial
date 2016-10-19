"use strict";
const Boom = require("Boom");
const in_memory_contact_service_1 = require("../services/in-memory-contact-service");
class HapiContactRouter {
    constructor() {
        console.log("HapiApplication ctor");
        this.contactService = new in_memory_contact_service_1.InMemoryContactService();
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
    }
}
exports.HapiContactRouter = HapiContactRouter;
//# sourceMappingURL=hapi-contact-routes.js.map