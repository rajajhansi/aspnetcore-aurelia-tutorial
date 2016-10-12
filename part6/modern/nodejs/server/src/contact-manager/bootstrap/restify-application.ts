"use strict";
import * as restify from "restify";
import {INodeJsApplication} from "./inodejs-application";
import {IContact} from "../models/icontact";
import {InMemoryContactService} from "../services/in-memory-contact-service";

export class RestifyApplication implements INodeJsApplication {
  private restifyApplication: restify.Server;
  private contactService: InMemoryContactService;

  constructor() {
    console.log("RestifyApplication ctor");
    this.contactService = new InMemoryContactService();
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

  private configErrorRoutes() {
    // catch 404 and forward to error handler
    this.restifyApplication.on("NotFound", function(request: restify.Request, response: restify.Response,
     erorr: restify.HttpError, next: restify.Next) {
      console.log("Invalid Url");
      var customError = new Error("Not Found");
      response.send(404, customError);
      return next();
    });
  }

  public configApiRoutes() {
      var endpoint = "/api/contacts";
        this.restifyApplication.get(endpoint, ((request: restify.Request, response: restify.Response, next: restify.Next) => {
           this.contactService.getAll().then((contacts : IContact[]) => {
                response.json(contacts);
                return next();
            });
        }));
  }

  public bootstrap(port: number) {
    let server = this.restifyApplication;
      // listen on provided ports
      server.listen(port, () => {
        console.log("%s listening at %s", server.name, server.url);
      });
  }
}