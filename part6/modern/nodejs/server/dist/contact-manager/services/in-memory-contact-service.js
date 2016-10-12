"use strict";
var Promise = require("bluebird");
let latency = 200;
let id = 0;
function getId() {
    "use strict";
    return ++id;
}
let contacts = [
    {
        id: getId(),
        firstName: "Raja",
        lastName: "Mani",
        email: "rmani@gmail.com",
        phoneNumber: "408-973-5050",
        birthDate: new Date(1973, 5, 1)
    },
    {
        id: getId(),
        firstName: "Jhansi",
        lastName: "Rani",
        email: "jrani@gmail.com",
        phoneNumber: "867-5309",
        birthDate: new Date(1970, 5, 24)
    },
    {
        id: getId(),
        firstName: "Aditi",
        lastName: "Raja",
        email: "araja@gmail.com",
        phoneNumber: "408-973-9006",
        birthDate: new Date(2001, 10, 12)
    },
    {
        id: getId(),
        firstName: "Mahati",
        lastName: "Raja",
        email: "mraja@gmail.com",
        phoneNumber: "408-973-8007",
        birthDate: new Date(2006, 2, 15)
    }
];
class InMemoryContactService {
    constructor() {
        this.isRequesting = false;
        console.log("InMemoryContactService ctor");
    }
    get(id) {
        this.isRequesting = true;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let found = contacts.filter((c) => c.id === id)[0];
                if (found) {
                    resolve(JSON.parse(JSON.stringify(found)));
                }
                else {
                    reject("contact not found");
                }
                this.isRequesting = false;
            }, latency);
        });
    }
    getAll() {
        this.isRequesting = true;
        return new Promise((resolve) => {
            setTimeout(() => {
                let results = contacts;
                resolve(results);
                this.isRequesting = false;
            }, latency);
        });
    }
    search(keyword) {
        this.isRequesting = true;
        return new Promise((resolve) => {
            setTimeout(() => {
                let results = contacts.filter((c) => ((c.firstName.indexOf(keyword) !== -1) ||
                    (c.lastName.indexOf(keyword) !== -1)));
                resolve(results);
                this.isRequesting = false;
            }, latency);
        });
    }
    save(contact) {
        this.isRequesting = true;
        return new Promise((resolve) => {
            setTimeout(() => {
                let instance = JSON.parse(JSON.stringify(contact));
                let found = contacts.filter((c) => c.id === contact.id)[0];
                if (found) {
                    let index = contacts.indexOf(found);
                    contacts[index] = instance;
                }
                else {
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
        return new Promise((resolve) => {
            setTimeout(() => {
                let newContact = {
                    id: getId(),
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    birthDate: null
                };
                contacts.push(newContact);
                this.isRequesting = false;
                resolve(newContact);
            }, latency);
        });
    }
    getContactIndex(id) {
        return contacts.findIndex((c) => c.id === id);
    }
    delete(id) {
        this.isRequesting = true;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let found = contacts.filter((c) => c.id === id)[0];
                if (found) {
                    console.log("Deleting Contact " + id);
                    var index = this.getContactIndex(id);
                    if (index !== -1) {
                        contacts.splice(index, 1);
                        console.log("Deleted Contact " + id);
                        console.log(contacts);
                        resolve(JSON.parse(JSON.stringify(found)));
                    }
                }
                else {
                    reject("contact not found");
                }
                this.isRequesting = false;
            }, latency);
        });
    }
}
exports.InMemoryContactService = InMemoryContactService;
//# sourceMappingURL=in-memory-contact-service.js.map