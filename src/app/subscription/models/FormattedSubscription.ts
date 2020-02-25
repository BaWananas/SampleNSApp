import {Subscription} from '@arhs/core';

export class FormattedSubscription extends Subscription {
    public groupName: string;
    public date: Date;

    constructor(groupName: string, date: Date, groupId: number, userId: number, id: number) {
        super(groupId, userId, id);
        this.groupName = groupName;
        this.date = date;
    }
}
