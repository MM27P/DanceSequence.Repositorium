export class AddMove {
    public id: number = 0;
    public name: string;
    public description: string;
    public danceId: number;

    constructor(id: number, name: string, description: string, danceId: number) {
       this.id = id;
       this.name = name;
       this.description = description;
       this.danceId =danceId;
    }
}