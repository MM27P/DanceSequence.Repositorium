import { Tag } from '../model/tag';

export class AddTags {
    public moveId: number;
    public tagsId: number[];

    constructor(moveId: number, tags: Tag[]) {
        this.moveId = moveId;
        this.tagsId = [];
        for (let tag of tags) {
            this.tagsId.push(tag.id);
        }
    }
}