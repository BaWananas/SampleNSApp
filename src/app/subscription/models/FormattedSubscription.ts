import {Subscription} from '@arhs/core';

/**
 * An extended version of @arhs/core subscription.
 *
 * Include more details.
 */
export class FormattedSubscription extends Subscription {
    /**
     * Name of the subscribed group.
     */
    public groupName: string;
    /**
     * Date of the subscription.
     */
    public date: Date;

    /**
     * Constructor.
     * @param groupName Name of the subscribed group.
     * @param date Date of the subscription.
     * @param groupId ID of the subscribed group.
     * @param userId ID of the subscribed user.
     * @param id ID of the subscription.
     */
    constructor(groupName: string, date: Date, groupId: number, userId: number, id: number) {
        super(groupId, userId, id);
        this.groupName = groupName;
        this.date = date;
    }
}
