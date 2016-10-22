"use strict";
import * as express from "express";
import * as debug from "debug";
import * as http from "http";
import {INodeJsApplication} from "./inodejs-application";
import {ExpressContactRouter} from "../routes/express-contact-router";
import {inject} from "aurelia-dependency-injection";

@inject(ExpressContactRouter)
export class ExpressApplication implements INodeJsApplication {
  private expressApplication: express.Application;

  constructor(private expressContactRouter: ExpressContactRouter) {
    // create expressjs application
    this.expressApplication = express();
  }

  public bootstrap(port: number) {
      // enable CORS
    this.expressApplication.use(function(request: express.Request, response: express.Response,
        next: express.NextFunction) {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Methods", "*");
        response.header("Access-Control-Allow-Headers", "*");
        next();
    });

    // configure API and error routes   
    this.expressContactRouter.configApiRoutes(this.expressApplication);
    this.expressContactRouter.configErrorRoutes(this.expressApplication);
    this.expressApplication.set("port", port);

    // create http server
    let server = http.createServer(this.expressApplication);
    server.listen(port);
    // add error handler
    server.on("error", onError);

    // start listening on port
    server.on("listening", onListening);

    // event listener for HTTP server "error" event.
    function onError(error: any) {
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