"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const express = require("express");
const debug = require("debug");
const http = require("http");
const express_contact_router_1 = require("../routes/express-contact-router");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
let ExpressApplication = class ExpressApplication {
    constructor(expressContactRouter) {
        this.expressContactRouter = expressContactRouter;
        // create expressjs application
        this.expressApplication = express();
        // configure API and error routes   
        this.expressContactRouter.configApiRoutes(this.expressApplication);
        this.expressContactRouter.configErrorRoutes(this.expressApplication);
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
};
ExpressApplication = __decorate([
    aurelia_dependency_injection_1.inject(express_contact_router_1.ExpressContactRouter)
], ExpressApplication);
exports.ExpressApplication = ExpressApplication;
//# sourceMappingURL=express-application.js.map