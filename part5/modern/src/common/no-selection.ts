export class NoSelection {
    message: string;

    activate(model: any) {
        this.message = model.message;
    }
}