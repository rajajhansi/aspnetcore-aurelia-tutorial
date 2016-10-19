"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const in_memory_contact_service_1 = require("../services/in-memory-contact-service");
class ExpressContactRoutes {
    constructor() {
        this.contactService = new in_memory_contact_service_1.InMemoryContactService();
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
}
exports.ExpressContactRoutes = ExpressContactRoutes;
//# sourceMappingURL=express-contact-routes.js.map