class Greeter {
    constructor(private message: string) {
    }
    sayHello() {
        console.log(`Hello ${this.message} from TypeScript!`);
    }
    get greetingMessage() : string {
        return `Hello ${this.message} from TypeScript!`;
    }
}