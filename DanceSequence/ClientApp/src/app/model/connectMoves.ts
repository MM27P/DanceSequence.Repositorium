import { Move } from '../model/move';
export class ConnectMoves {
    public moveId: number;
    public MovesId: number[];

    constructor(moveId: number, moves: Move[]) {
       this.moveId = moveId;
       this.MovesId = [];
       for(let move of moves)
       {
        this.MovesId.push(move.id);
       }
    }
}