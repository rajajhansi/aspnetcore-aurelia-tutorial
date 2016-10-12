"use strict";
import * as Hapi from "hapi";
import * as Boom from "Boom";
import {INodeJsApplication} from "./inodejs-application";
import {IContact} from "../models/icontact";
import {InMemoryContactService} from "../services/in-memory-contact-service";

export class HapiApplication implements INodeJsApplication {
  public hapiApplication: Hapi.Server;
  private contactService: InMemoryContactService;
  constructor() {
    console.log("HapiApplication ctor");
    // create expressjs application
    this.hapiApplication = new Hapi.Server();
    this.contactService = new InMemoryContactService();
  }

  private configErrorRoutes() {
    // catch 404 and forward to error handler
    this.hapiApplication.ext("onPreResponse", (request: Hapi.Request, reply: Hapi.IReply) => {
       if(request.response.isBoom) {
         if(request.response.output.statusCode === 404) {
           console.log("Invalid Url");
            return reply(Boom.notFound("check your url"));
         }
         return reply(request.response);
       }
       return reply.continue();
    });
  }

  public configApiRoutes() {
      var endpoint = "/api/contacts";
        this.hapiApplication.route({
            path: endpoint,
            method: "GET",
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
               this.contactService.getAll().then((contacts : IContact[]) => {
                  reply(contacts);
               });
            }});
  }

  public bootstrap(port: number) {
    this.hapiApplication.connection({port: port});
    // configure error routes
    this.configErrorRoutes();
    // configure API routes
    this.configApiRoutes();
    this.hapiApplication.start(() => {
      console.log("Listening on " + this.hapiApplication.info.uri);
    });
  }
}