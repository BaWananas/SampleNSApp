import {EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

export abstract class RefreshableListComponent<T, ID> implements OnInit, OnDestroy {
    @Input() removeElementFromList: EventEmitter<T | ID> = undefined;
    @Input() addElementToList: EventEmitter<T | ID> = undefined;
    @Input() refreshEntireList: EventEmitter<void>;

    private removeEventSubscription: Subscription;
    private addEventSubscription: Subscription;
    private refreshEntireEventSubscription: Subscription;

    protected subscribeToRefreshableEvents(): void {
        if (this.removeElementFromList) {
            this.removeEventSubscription = this.removeElementFromList.subscribe((id: T | ID) => {
                this.removeElement(id);
            });
        }

        if (this.addElementToList) {
            this.addEventSubscription = this.addElementToList.subscribe((id: T | ID) => {
                this.addElement(id);
            });
        }

        if (this.refreshEntireList) {
            this.refreshEntireEventSubscription = this.refreshEntireList.subscribe(() => {
                this.refreshList();
            });
        }
    }

    protected unsubscribeToRefreshableEvents(): void {
        if (this.removeEventSubscription) {
            this.removeEventSubscription.unsubscribe();
        }

        if (this.addEventSubscription) {
            this.addEventSubscription.unsubscribe();
        }

        if (this.refreshEntireList) {
            this.refreshEntireEventSubscription.unsubscribe();
        }
    }

    protected abstract refreshList(newList?: T[]): void;

    protected abstract addElement(element: T | ID): void;

    protected abstract removeElement(element: T | ID): void;

    protected abstract convertToId(element: T): ID;

    protected abstract convertToElement(id: ID): T;

    ngOnDestroy(): void {
        this.unsubscribeToRefreshableEvents();
    }

    ngOnInit(): void {
        this.subscribeToRefreshableEvents();
    }
}
