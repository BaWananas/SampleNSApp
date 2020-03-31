import { Component, OnInit } from '@angular/core';
import { EventData, Switch } from '@nativescript/core';
import {INotificationService} from '@src/app/notification/services/INotificationService';
import {NotificationService} from '@src/app/notification/services/implementations/notification.service';

/**
 * Home page of notification section. (Mobile only)
 */
@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.tns.html',
  styleUrls: ['./notification-center.component.css']
})
export class NotificationCenterComponent implements OnInit {

  /*
  Services
   */
  /**
   * @ignore
   */
  private notificationService: INotificationService;

  /*
  Notification's topics
   */
  private groupCreationTopic = 'groupCreation';

  /**
   * Is currently subscribed to groupCreation topic's notifications.
   */
  public isSubscribedToGroupCreation = false;

  /**
   * Constructor.
   */
  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
  }

  /**
   * Refers to {@link OnInit}
   */
  ngOnInit() {
    this.isSubscribedToGroupCreation = this.notificationService.isSubscribedToTopic(this.groupCreationTopic);
  }

  /**
   * Triggered when groupCreation switch was checked/unchecked.
   * @param args
   */
  public onGroupCreationSwitchCheckedChange(args: EventData): void {
    const sw = args.object as Switch;

    if (sw.checked) {
      this.subscribeToGroupCreation();
    } else {
      this.unsubscribeToGroupCreation();
    }
  }

  /**
   * Subscribe from groupCreation topic in FCM.
   *
   * Save choice in persistent session.
   */
  private subscribeToGroupCreation(): void {
    this.notificationService.subscribeToTopic(this.groupCreationTopic);
    this.isSubscribedToGroupCreation = true;
  }

  /**
   * Unsubscribe from groupCreation topic in FCM.
   *
   * Save choice in persistent session.
   */
  private unsubscribeToGroupCreation(): void {
    this.notificationService.unsubscribeToTopic(this.groupCreationTopic);
    this.isSubscribedToGroupCreation = false;
  }

}
