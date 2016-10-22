"use strict";
import * as Hapi from "hapi";
import * as Boom from "Boom";
import {INodeJsApplication} from "./inodejs-application";
import {HapiContactRouter} from "../routes/hapi-contact-router";
import {inject} from "aurelia-dependency-injection";

@inject(HapiContactRouter)
export class HapiApplication implements INodeJsApplication {
  public hapiApplication: Hapi.Server;

  constructor(private hapiContactRouter: HapiContactRouter) {
    console.log("HapiApplication ctor");
    // create expressjs application
    this.hapiApplication = new Hapi.Server();
  }

  public bootstrap(port: number) {
    this.hapiApplication.connection({port: port, routes: { cors: true }});
    // configure error routes
    this.hapiContactRouter.configErrorRoutes(this.hapiApplication);
    // configure API routes
    this.hapiContactRouter.configApiRoutes(this.hapiApplication);
    this.hapiApplication.start(() => {
      console.log("Listening on " + this.hapiApplication.info.uri);
    });
  }
}