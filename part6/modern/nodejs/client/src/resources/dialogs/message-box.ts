import {inject} from "aurelia-framework";
import {DialogController} from "aurelia-dialog";

@inject(DialogController)
export class MessageBox {
    message: string;
    answer: string;
    constructor(private controller: DialogController) {
        this.controller.settings.centerHorizontalOnly = true;
    }
    activate(message: string) {
        this.message = message;
    }
}