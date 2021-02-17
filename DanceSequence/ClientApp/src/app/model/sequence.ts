import { Move } from '../model/move';

export class Sequence {
    public id: number = 0;
    public name: string;
    public movesNumber: number =0;
    public moves : Move[];
}