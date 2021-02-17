import { Move } from '../model/move';
import { Tag } from '../model/tag';
import { Alternation } from '../model/alternation';

export class MoveDetails {
    public id: number = 0;
    public name: string;
    public description: string;
    public preMoves: Move[];
    public proMoves: Move[];
    public alternations: Alternation[];
    public tags: Tag[];
}