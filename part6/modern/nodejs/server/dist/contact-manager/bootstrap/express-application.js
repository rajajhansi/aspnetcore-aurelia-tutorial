"use strict";
const express = require("express");
const debug = require("debug");
const http = require("http");
const bodyParser = require("body-parser");
const in_memory_contact_service_1 = require("../services/in-memory-contact-service");
class ExpressApplication {
    constructor() {
        // create expressjs application
        this.expressApplication = express();
        // create expressjs router
        this.contactRouter = express.Router();
        this.contactService = new in_memory_contact_service_1.InMemoryContactService();
        // configure application routes
        this.configErrorRoutes();
        this.configApiRoutes();
    }
    configErrorRoutes() {
        // catch 404 error
        this.expressApplication.use(function (request, response, next) {
            response.status(404).send("Not Found");
        });
        // catch 500 error (Internal Server Error)
        this.expressApplication.use(function (err, request, response, next) {
            console.log("Application Error");
            response.sendStatus(500);
        });
    }
    configApiRoutes() {
        this.contactRouter.route("/contacts")
            .get((request, response) => {
            this.contactService.getAll().then((contacts) => {
                response.json(contacts);
            });
        });
        this.expressApplication.use("/api", bodyParser.json());
        this.expressApplication.use("/api", this.contactRouter);
    }
    bootstrap(port) {
        this.expressApplication.set("port", port);
        // create http server
        let server = http.createServer(this.expressApplication);
        server.listen(port);
        // add error handler
        server.on("error", onError);
        // start listening on port
        server.on("listening", onListening);
        // event listener for HTTP server "error" event.
        function onError(error) {
            "use strict";
            if (error.syscall !== "listen") {
                throw error;
            }
            let bind = typeof port === "string"
                ? "Pipe " + port
                : "Port " + port;
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case "EACCES":
                    console.error(bind + " requires elevated privileges");
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    console.error(bind + " is already in use");
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        }
        /**
         * Event listener for HTTP server "listening" event.
         */
        function onListening() {
            let addr = server.address();
            let bind = typeof addr === "string"
                ? "pipe " + addr
                : "port " + addr.port;
            let debugForExpress = debug("ExpressApplication");
            debugForExpress("Listening on " + bind);
        }
    }
}
exports.ExpressApplication = ExpressApplication;
//# sourceMappingURL=express-application.js.map