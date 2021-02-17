export class Move {
    public id: number = 0;
    public name: string;
    public description: string;

    constructor(id: number, name: string, description: string) {
       this.id = id;
       this.name = name;
       this.description = description;
    }
}