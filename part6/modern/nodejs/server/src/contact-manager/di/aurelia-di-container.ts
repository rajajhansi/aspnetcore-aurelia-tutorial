import "aurelia-polyfills";
import {Container} from "aurelia-dependency-injection";
import {NodeServer} from "../../node-server";

export class AureliaDIContainer {
    static bootstrap() {
        let container = new Container();
        let nodeServer = container.get(NodeServer);
        nodeServer.bootstrap();
    }
}

AureliaDIContainer.bootstrap();