import {inject} from "aurelia-dependency-injection";
import {NodeJsFrameworkFactory} from "./contact-manager/bootstrap/nodejs-framework-factory";

@inject(NodeJsFrameworkFactory)
export class NodeServer {
  constructor(private nodejsFrameworkFactory : NodeJsFrameworkFactory) {
    console.log("NodeServer ctor");
  }

  private normalizePort(val: string) : any {
      "use strict";
      let port = parseInt(val, 10);

      if (isNaN(port)) {
        // named pipe
        return val;
      }
      if (port >= 0) {
        // port number
        return port;
      }
      return false;
  }

  bootstrap() {
    // get port from environment and store in Express.
    let port = this.normalizePort(process.env.PORT || 8080);
    let restFramework = process.env.REST_FRAMEWORK || "express";
    let server = this.nodejsFrameworkFactory.createNodeJsFramework(restFramework);

    server.bootstrap(port);
  }
}