"use strict";
import * as express from "express";
import * as debug from "debug";
import * as http from "http";
import * as bodyParser from "body-parser";
import {INodeJsApplication} from "./inodejs-application";
import {IContact} from "../models/icontact";
import {InMemoryContactService} from "../services/in-memory-contact-service";


export class ExpressApplication implements INodeJsApplication {
  private expressApplication: express.Application;
  private contactRouter: express.Router;
  private contactService: InMemoryContactService;

  constructor() {
    // create expressjs application
    this.expressApplication = express();
    // create expressjs router
    this.contactRouter = express.Router();

    this.contactService = new InMemoryContactService();
    // configure application routes
    this.configErrorRoutes();
    this.configApiRoutes();
  }

  private configErrorRoutes() {
     // catch 404 error
    this.expressApplication.use(function(request: express.Request, response: express.Response, next: express.NextFunction) {
        response.status(404).send("Not Found");
    });

    // catch 500 error (Internal Server Error)
    this.expressApplication.use(function(err: any, request: express.Request, response: express.Response, next: express.NextFunction) {
      console.log("Application Error");
      response.sendStatus(500);
    });
  }

   private configApiRoutes() {
    this.contactRouter.route("/contacts")
        .get((request: express.Request, response: express.Response) => {
           this.contactService.getAll().then((contacts : IContact[]) => {
                response.json(contacts);
            });
        });
    this.expressApplication.use("/api", bodyParser.json());
    this.expressApplication.use("/api", this.contactRouter);
  }

  public bootstrap(port: number) {
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