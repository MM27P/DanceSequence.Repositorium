import { Move } from '../model/move';
export class AddSequence {
    public name: string;
    public ids: number[];
    public userId: number;

    constructor(name: string, moves: Move[], userId: number) {
       this.name = name;
       this.ids = [];
       this.userId = userId;
       for(let move of moves)
       {
        this.ids.push(move.id);
       }
    }
}