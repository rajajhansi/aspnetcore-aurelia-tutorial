import { Greeter } from "./Greeter";
export class Main {
    private greeter: Greeter;
    constructor() {
        this.greeter = new Greeter("World");
    }
    sayHello() {
        this.greeter.sayHello();
        document.getElementById("greeting").innerHTML = "<h1>" + m.greetingMessage + "</h1>";
    }
    get greetingMessage() : string {
        return this.greeter.greetingMessage;
    }
}

var m = new Main();
m.sayHello();
console.log(m.greetingMessage);