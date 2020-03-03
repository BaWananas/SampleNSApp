import {EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

/**
 * Represent basic operation and properties for a refreshable list.
 */
export abstract class RefreshableListComponent<T, ID> implements OnInit, OnDestroy {
    /**
     * Listen to this event for removed element.
     */
    @Input() removeElementFromList: EventEmitter<T | ID> = undefined;
    /**
     * Listen to this event for adding element.
     */
    @Input() addElementToList: EventEmitter<T | ID> = undefined;
    /**
     * Listen to this event for refreshing the list.
     */
    @Input() refreshEntireList: EventEmitter<void>;

    /**
     * RXJS Subscription for removeElementFromList event.
     */
    private removeEventSubscription: Subscription;
    /**
     * RXJS Subscription for addElementToList event.
     */
    private addEventSubscription: Subscription;
    /**
     * RXJS Subscription for refreshEntireList event.
     */
    private refreshEntireEventSubscription: Subscription;

    /**
     * Proceed to the events subscription.
     */
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

    /**
     * Proceed to the events unsubscription.
     */
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

    /**
     * Refresh the list.
     * @param newList Optional list that will be assign to the current list.
     */
    protected abstract refreshList(newList?: T[]): void;

    /**
     * Add an element to the list.
     * @param element Element that will be added.
     */
    protected abstract addElement(element: T | ID): void;

    /**
     * Remove an element from the list.
     * @param element Element that will be removed.
     */
    protected abstract removeElement(element: T | ID): void;

    /**
     * Retrieve the ID of the element in the list.
     * @param element The element.
     * @returns ID The element ID.
     */
    protected abstract convertToId(element: T): ID;

    /**
     * Retrieve an element from the list by his ID.
     * @param id Id of the element.
     * @returns T The element.
     */
    protected abstract convertToElement(id: ID): T;

    /**
     * Refers to {@link OnDestroy}
     */
    ngOnDestroy(): void {
        this.unsubscribeToRefreshableEvents();
    }

    /**
     * Refers to {@link OnInit}
     */
    ngOnInit(): void {
        this.subscribeToRefreshableEvents();
    }
}
