"use strict";
import * as Hapi from "hapi";
import * as Boom from "Boom";
import {IContact} from "../models/icontact";
import {InMemoryContactService} from "../services/in-memory-contact-service";
import {inject} from "aurelia-dependency-injection";

@inject(InMemoryContactService)
export class HapiContactRouter {
  constructor(private contactService: InMemoryContactService) {
    console.log("HapiApplication ctor");
  }

  public configErrorRoutes( hapiApplication: Hapi.Server) {
    // catch 404 and forward to error handler
     hapiApplication.ext("onPreResponse", (request: Hapi.Request, reply: Hapi.IReply) => {
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

  public configApiRoutes(hapiApplication: Hapi.Server) {
      var endpoint = "/api/contacts/{id?}";
        hapiApplication.route({
            path: endpoint,
            method: "GET",
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                if(request.params.id) {
                    this.contactService.get(parseInt(request.params.id, 10)).then((contact : IContact) => {
                        reply(contact);
                    });
                } else {
                    this.contactService.getAll().then((contacts : IContact[]) => {
                        reply(contacts);
                    });
                }
            }});
        hapiApplication.route({
            path: endpoint,
            method: "POST",
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                this.contactService.save(request.payload).then((contact : IContact) => {
                reply(contact);
            });
        }});
        hapiApplication.route({
            path: endpoint,
            method: "PUT",
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                this.contactService.save(request.payload).then((contact : IContact) => {
                reply(contact);
            });
        }});
        hapiApplication.route({
            path: endpoint,
            method: "DELETE",
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                this.contactService.delete(parseInt(request.payload.id, 10)).then((contact : IContact) => {
                reply(contact);
            });
        }});
    }
}
