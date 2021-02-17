import { Alternation } from '../model/alternation';

export class AddAlternation {
    public moveId: number;
    public alternations: Alternation[];

    constructor(moveId: number, alternations: Alternation[]) {
       this.moveId = moveId;
       this.alternations = alternations;
    }
}