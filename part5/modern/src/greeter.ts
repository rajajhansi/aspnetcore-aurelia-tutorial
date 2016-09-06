import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

@inject(HttpClient)
export class Greeter {
private greetingMessageViaApi : string;
    constructor(private httpClient: HttpClient, private message: string = "World") {
    }

    async activate(): Promise<void> {
     // ensure fetch is polyfilled before we create the http client
        await fetch;
        this.httpClient.configure( (config: any) => {
        config
       .useStandardConfiguration()
       .withBaseUrl("http://localhost:5000/api/");
        });

        const http = this.httpClient;
        const response = await http.fetch("greetings");
        var greeting = await response.json();
        this.greetingMessageViaApi = greeting.message;
        console.log(this.greetingMessageViaApi);
    }
    sayHello() {
        console.log(`Hello ${this.message} from TypeScript!`);
    }
    get greetingMessage() : string {
        return `Hello ${this.message} from TypeScript!`;
    }
}