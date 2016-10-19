"use strict";
import * as restify from "restify";
import {INodeJsApplication} from "./inodejs-application";
import {RestifyContactRouter} from "../routes/restify-contact-router";
import {inject} from "aurelia-dependency-injection";

@inject(RestifyContactRouter)
export class RestifyApplication implements INodeJsApplication {
  private restifyApplication: restify.Server;

  constructor(private restifyContactRouter: RestifyContactRouter) {
    console.log("RestifyApplication ctor");
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

    // configure API and error routes
    this.restifyContactRouter.configApiRoutes(this.restifyApplication);
    this.restifyContactRouter.configErrorRoutes(this.restifyApplication);
  }

  public bootstrap(port: number) {
    let server = this.restifyApplication;
      // listen on provided ports
      server.listen(port, () => {
        console.log("%s listening at %s", server.name, server.url);
      });
  }
}