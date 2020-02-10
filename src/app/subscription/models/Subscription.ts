import {IEntityModel} from '@src/app/shared/models/HttpResponse/IEntityModel';
import {HypermediaLinks} from '@src/app/shared/models/HttpResponse/HypermediaLinks';

export class Subscription implements IEntityModel {

    public id: number;
    public groupId: number;
    public userId: number;
    _links: HypermediaLinks;

    constructor(group: number, userId: number, id: number = null) {
        this.id = id;
        this.groupId = group;
        this.userId = userId;
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}
