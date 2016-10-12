"use strict";
const restify = require("restify");
const in_memory_contact_service_1 = require("../services/in-memory-contact-service");
class RestifyApplication {
    constructor() {
        console.log("RestifyApplication ctor");
        this.contactService = new in_memory_contact_service_1.InMemoryContactService();
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
        // configure error routes
        this.configErrorRoutes();
        // configure API routes
        this.configApiRoutes();
    }
    configErrorRoutes() {
        // catch 404 and forward to error handler
        this.restifyApplication.on("NotFound", function (request, response, erorr, next) {
            console.log("Invalid Url");
            var customError = new Error("Not Found");
            response.send(404, customError);
            return next();
        });
    }
    configApiRoutes() {
        var endpoint = "/api/contacts";
        this.restifyApplication.get(endpoint, ((request, response, next) => {
            this.contactService.getAll().then((contacts) => {
                response.json(contacts);
                return next();
            });
        }));
    }
    bootstrap(port) {
        let server = this.restifyApplication;
        // listen on provided ports
        server.listen(port, () => {
            console.log("%s listening at %s", server.name, server.url);
        });
    }
}
exports.RestifyApplication = RestifyApplication;
//# sourceMappingURL=restify-application.js.map