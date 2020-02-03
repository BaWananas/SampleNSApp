import {HypermediaLinks} from '@src/app/shared/models/HttpResponse/HypermediaLinks';
import {IEntityModel} from '@src/app/shared/models/HttpResponse/IEntityModel';

export class CollectionModel<T extends IEntityModel> {
    public _embedded: {
        items: T[];
    };
    public _links: HypermediaLinks;
}
