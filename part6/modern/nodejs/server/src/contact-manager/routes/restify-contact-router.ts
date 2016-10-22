"use strict";
import * as restify from "restify";
import {IContact} from "../models/IContact";
import {InMemoryContactService} from "../services/in-memory-contact-service";
import {inject} from "aurelia-dependency-injection";

@inject(InMemoryContactService)
export class RestifyContactRouter {
    constructor(private contactService: InMemoryContactService) {
        console.log("RestifyContactRoutes ctor");
    }

 public configErrorRoutes(restifyApplication: restify.Server) {
    // catch 404 and forward to error handler
    restifyApplication.on("NotFound", function(request: restify.Request, response: restify.Response,
     erorr: restify.HttpError, next: restify.Next) {
      console.log("Invalid Url");
      var customError = new Error("Not Found");
      response.send(404, customError);
      return next();
    });
  }

  public configApiRoutes(restifyApplication: restify.Server) {
      let endpoint = "/api/contacts";
        restifyApplication.get(endpoint, ((request: restify.Request, response: restify.Response, next: restify.Next) => {
        {
            this.contactService.getAll().then((contacts : IContact[]) => {
                response.json(contacts);
                return next();
            });
        }));

        restifyApplication.post(endpoint, ((request: restify.Request, response: restify.Response, next: restify.Next) => {
            this.contactService.save(request.body).then((contact : IContact) => response.json(contact));
            return next();
        }));

        restifyApplication.put(endpoint, ((request: restify.Request, response: restify.Response, next: restify.Next) => {
            this.contactService.save(request.body).then((contact : IContact) => response.json(contact));
            return next();
        }));

        restifyApplication.del(endpoint, ((request: restify.Request, response: restify.Response, next: restify.Next) => {
            this.contactService.delete(parseInt(request.body.id, 10)).then((contact : IContact) => response.json(contact));
            return next();
        }));

        let idEndpoint = `${endpoint}/:id`;
        restifyApplication.get(idEndpoint, ((request: restify.Request, response: restify.Response, next: restify.Next) => {
        if(request.params.id) {
            this.contactService.get(parseInt(request.params.id, 10)).then((contact : IContact) => {
                response.json(contact);
                return next();
            });
        }
    }));
  }
}