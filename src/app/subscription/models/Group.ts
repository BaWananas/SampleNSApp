import {IEntityModel} from '@src/app/shared/models/HttpResponse/IEntityModel';
import {HypermediaLinks} from '@src/app/shared/models/HttpResponse/HypermediaLinks';

export class Group implements IEntityModel {

    id: number;
    associationId: number;
    name: string;
    description: string;
    _links: HypermediaLinks;

    constructor(associationId: number, name: string, description: string, id: number = null) {
        this.associationId = associationId;
        this.name = name;
        this.description = description;
        this.id = id;
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}
