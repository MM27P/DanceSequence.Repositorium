export class Tag {
    public id: number = 0;
    public value: string;
    public description: string;

    constructor(id: number, name: string, description: string) {
       this.id = id;
       this.value = name;
       this.description = description;
    }
}