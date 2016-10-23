import {IContact} from "../contact-manager/icontact";
import {IContactService} from "./icontact-service";

let latency = 200;
let id = 0;

function getId(){
  "use strict";
  return ++id;
}

let contacts = [
  {
    id:getId(),
    firstName:"Raja",
    lastName:"Mani",
    email:"rmani@gmail.com",
    phoneNumber:"408-973-5050",
    birthDate: new Date(1973, 5, 1)
  },
  {
    id:getId(),
    firstName:"Jhansi",
    lastName:"Rani",
    email:"jrani@gmail.com",
    phoneNumber:"867-5309",
    birthDate: new Date(1970, 5, 24)
  },
  {
    id:getId(),
    firstName:"Aditi",
    lastName:"Raja",
    email:"araja@gmail.com",
    phoneNumber:"408-973-9006",
    birthDate: new Date(2001, 10, 12)
  },
  {
    id:getId(),
    firstName:"Mahati",
    lastName:"Raja",
    email:"mraja@gmail.com",
    phoneNumber:"408-973-8007",
    birthDate: new Date(2006, 2, 15)
  }
];

export class InMemoryContactService implements IContactService {
  isRequesting = false;

  get(id: number) {
    this.isRequesting = true;
    return new Promise((resolve: any) => {
      setTimeout(() => {
        let found = contacts.filter( (c: IContact) => c.id === id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  getAll() {
    this.isRequesting = true;
    return new Promise( (resolve: any) => {
      setTimeout(() => {
        let results = contacts;
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  search(keyword: string) {
    this.isRequesting = true;
    return new Promise((resolve: any) => {
      setTimeout(() => {
        let results = contacts.filter((c: IContact) => ((c.firstName.indexOf(keyword) !== -1) ||
        (c.lastName.indexOf(keyword) !== -1)));
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  save(contact: IContact) {
    this.isRequesting = true;
    return new Promise((resolve: any) => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(contact));
        let found = contacts.filter((c: IContact) => c.id === contact.id)[0];

        if(found) {
          let index = contacts.indexOf(found);
          contacts[index] = instance;
        } else {
          instance.id = getId();
          contacts.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
  create() {
    this.isRequesting = true;
    return new Promise((resolve: any) => {
      setTimeout(() => {
        let newContact = {
          id: getId(),
          firstName:"",
          lastName:"",
          email:"",
          phoneNumber:"",
          birthDate: null
        };
        contacts.push(newContact);
        this.isRequesting = false;
        resolve(newContact);
      }, latency);
    });
  }

  private getContactIndex(id: number) : number {
       return contacts.findIndex((c:IContact) => c.id === id);
    }

  delete(id: number) {
    this.isRequesting = true;
    return new Promise((resolve: any) => {
      setTimeout(() => {
        let found = contacts.filter((c: IContact) => c.id === id)[0];
         console.log("Deleting Contact " + id);
        var index = this.getContactIndex(id);
        contacts.splice(index,1);
        console.log("Deleted Contact " + id);
        console.log(contacts);
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }
}
