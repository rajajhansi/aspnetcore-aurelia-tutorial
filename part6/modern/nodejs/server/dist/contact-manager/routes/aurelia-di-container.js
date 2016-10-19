"use strict";
require("aurelia-polyfills");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
const node_server_1 = require("../../node-server");
class AureliaDIContainer {
    static bootstrap() {
        let container = new aurelia_dependency_injection_1.Container();
        let nodeServer = container.get(node_server_1.NodeServer);
        nodeServer.bootstrap();
    }
}
exports.AureliaDIContainer = AureliaDIContainer;
AureliaDIContainer.bootstrap();
//# sourceMappingURL=aurelia-di-container.js.map