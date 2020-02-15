export class Memory {
    constructor(text: string, id: string) {
        this.id = id;
        this.date = new Date();
        this.done = false;
        this.text = text;
    }
    id: string;
    date: Date;
    done: boolean;
    text: string;
}
