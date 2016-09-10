import {inject} from "aurelia-framework";
import {areEqual} from "../services/utility";
import * as toastr from "toastr";
import {DialogService} from "aurelia-dialog";
import {MessageBox} from "../resources/dialogs/message-box";
import {IContact} from "./icontact";
import {InMemoryContactService} from "../services/in-memory-contact-service";
import {ContactViewed, ContactUpdated} from "../resources/messages/contact-messages";
import {EventAggregator} from "aurelia-event-aggregator";
import {ContactService} from "../services/contact-service";

@inject(DialogService, ContactService, EventAggregator)
export class ContactDetail {
    routeConfig;
    contact: IContact;
    originalContact: IContact;

    constructor(private dialogService: DialogService, private contactService: ContactService,
        private ea: EventAggregator) {}

    activate(params, routeConfig) {
        this.routeConfig = routeConfig;

        return this.contactService.get(params.id).then(contact => {
            this.contact = <IContact>contact;
            this.routeConfig.navModel.setTitle(this.contact.firstName);
            this.originalContact = JSON.parse(JSON.stringify(this.contact));
            this.ea.publish(new ContactViewed(this.contact));
        });
    }

    get canSave() {
        return this.contact.firstName && this.contact.lastName && !this.contactService.isRequesting;
    }

    save() {
        this.contactService.save(this.contact).then(contact => {
            this.contact = <IContact>contact;
            this.routeConfig.navModel.setTitle(this.contact.firstName);
            this.originalContact = JSON.parse(JSON.stringify(contact));
            this.ea.publish(new ContactUpdated(this.contact));
            toastr.success(`Contact info of ${this.contact.firstName} saved successfully!`);
        });
    }

    async canDeactivate() {
        if(!areEqual(this.originalContact, this.contact)) {
          let result = await this.dialogService.open(
              {viewModel: MessageBox, model: "You have unsaved changes. Are you sure you wish to leave?"})
          .then(response => {
              console.log(response);

              if(!response.wasCancelled){
                  return true;
              } else {
                  this.ea.publish(new ContactViewed(this.contact));
              }
              console.log(response.output);
              return false;
          });
          console.log(result);
          return result;
        }
        return true;
    }
}