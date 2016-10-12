import {IContact} from "../models/icontact";

export interface IContactService {
    getAll();
    get(id: number);
    search(keyword: string);
    save(contact: IContact);
    create();
    delete(id: number);
}