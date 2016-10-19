"use strict";
import * as express from "express";
import * as bodyParser from "body-parser";
import {IContact} from "../models/icontact";
import {InMemoryContactService} from "../services/in-memory-contact-service";
import {inject} from "aurelia-dependency-injection";

@inject(InMemoryContactService)
export class ExpressContactRouter {
    private contactRouter: express.Router;

    constructor(private contactService: InMemoryContactService) {
       this.contactRouter = express.Router();
    }

    configErrorRoutes(expressApplication: express.Application) {
         // catch 404 error
        expressApplication.use(function(request: express.Request, response: express.Response, next: express.NextFunction) {
            response.status(404).send("Not Found");
        });

        // catch 500 error (Internal Server Error)
        expressApplication.use(function(err: any, request: express.Request, response: express.Response, next: express.NextFunction) {
        console.log("Application Error");
        response.sendStatus(500);
        });
    }

    configApiRoutes(expressApplication: express.Application) {
        this.contactRouter.route("/contacts")
        .get((request: express.Request, response: express.Response) => {
           this.contactService.getAll().then((contacts : IContact[]) => {
                response.json(contacts);
            });
        })
        .post((request: express.Request, response: express.Response) => {
            this.contactService.save(request.body).then((contact: IContact) => response.json(contact));
        })
        .put((request: express.Request, response: express.Response) => {
            this.contactService.save(request.body).then((contact: IContact) => response.json(contact));
        })
        .delete((request: express.Request, response: express.Response) => {
            this.contactService.delete(parseInt(request.body.id, 10)).then((contact: IContact) => response.json(contact));
        });
        expressApplication.use("/api", bodyParser.json());
        expressApplication.use("/api", this.contactRouter);
    }
}
