export abstract class SubscribingPageCommon {

    protected constructor() {
    }

    public subscribe(groupId: number): void {

    }

    public unsubscribe(index: number, groupId: number): void {

    }

    public isSubscribed(groupId: number): boolean {
        return false;
    }

    public getSubscriptionId(groupId: number): number {
        return undefined;
    }
}
