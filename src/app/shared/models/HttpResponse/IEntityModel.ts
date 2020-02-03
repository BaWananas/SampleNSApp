import {HypermediaLinks} from '@src/app/shared/models/HttpResponse/HypermediaLinks';

export interface IEntityModel {
    _links: HypermediaLinks;
    toJson(): string;
}
