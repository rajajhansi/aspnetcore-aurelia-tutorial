import {inject, Lazy} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {IContact} from "../contact-manager/contact";
import {Config} from "../common/config";
import {IContactService} from "./icontact-service";

// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

@inject(HttpClient)
export class ContactService implements IContactService {
private contacts : IContact[] ;
isRequesting = false;

    constructor(private httpClient: HttpClient, private message: string = "World") {
        this.init();
    }
    async init() {
        // ensure fetch is polyfilled before we create the http client
        await fetch;
        this.httpClient.configure( (config: any) => {
        config
       .useStandardConfiguration()
       .withBaseUrl(Config.baseApiUrl);
        });
    }

    getAll() {
        this.isRequesting = true;
        return new  Promise( async resolve => {
            const http = this.httpClient;
            const response = await http.fetch("contacts");
            this.contacts = await response.json();
            let results = this.contacts;
            resolve(results);
            this.isRequesting = false;
        });
    }

    search(keyword: string) {
    this.isRequesting = true;
    return new  Promise( async resolve => {
            const http = this.httpClient;
            const response = await http.fetch("contacts/search", {
              method: "post",
              body: json(keyword)
            });
            this.contacts = await response.json();
            let results = this.contacts;
            resolve(results);
            this.isRequesting = false;
        });
  }

  get(id: number) {
    this.isRequesting = true;
    return new  Promise( async resolve => {
            const http = this.httpClient;
            const response = await http.fetch(`contacts/${id}`);
            let foundContact = await response.json();
            let result = foundContact;
            resolve(result);
            console.log(result);
            this.isRequesting = false;
        });
  }

  save(contact){
    this.isRequesting = true;
     return new  Promise( async resolve => {
            const http = this.httpClient;
            const response = await http.fetch("contacts", {
              method: "put",
              body: json(contact)
            });
            let result = await response.json();
            resolve(result);
            console.log(result);
            this.isRequesting = false;
        });
    }

   create() {
    this.isRequesting = true;
    return new  Promise( async resolve => {
            const http = this.httpClient;
            let newContact = {
              id: 0,
              firstName:"",
              lastName:"",
              email:"",
              phoneNumber:""
            };
            const response = await http.fetch("contacts", {
              method: "post",
              body: json(newContact)
            });
            let justCreatedContact = <IContact> (await response.json());
            resolve(justCreatedContact);
            console.log(justCreatedContact);
            this.isRequesting = false;
        });
  }
  getContactIndex(id: number) : number {
       return this.contacts.findIndex((c:IContact) => c.id === id);
  }

  delete(id: number) {
    this.isRequesting = true;
    return new  Promise( async resolve => {
            const http = this.httpClient;
            const response = await http.fetch("contacts", {
              method: "delete",
              body: json(id)
            });
            resolve();
            console.log(response);
            this.isRequesting = false;
        });
  }
}