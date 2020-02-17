export class FormattedSubscription {
    groupName: string;
    date: Date;

    constructor(groupName: string, date: Date) {
        this.groupName = groupName;
        this.date = date;
    }
}
