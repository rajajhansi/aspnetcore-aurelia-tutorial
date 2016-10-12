"use strict";
const nodejs_framework_factory_1 = require("./contact-manager/bootstrap/nodejs-framework-factory");
class NodeServer {
    constructor() {
        console.log("NodeServer ctor");
        this.nodejsFrameworkFactory = new nodejs_framework_factory_1.NodeJsFrameworkFactory();
    }
    normalizePort(val) {
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
exports.NodeServer = NodeServer;
let nodeServer = new NodeServer();
nodeServer.bootstrap();
//# sourceMappingURL=node-server.js.map