import {Injectable} from '@angular/core';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {SessionsServiceCommon} from '@src/app/shared/services/implementations/sessionService/sessions.service.common';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {getNumber, remove, setNumber, setString, getString} from '@nativescript/core/application-settings/application-settings';

/**
 * Implementation of {@link ISessionService}.
 *
 * Mobile implementation of SessionService.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService extends SessionsServiceCommon {

  /**
   * Side drawer of mobile App.
   */
  public sideDrawer: RadSideDrawerComponent;

  /**
   * Current notification's topics list.
   */
  public topics: string[] = [];

  /**
   * Constructor.
   * Refers to {@link SessionsServiceCommon}
   * @param logger
   */
  constructor(logger: LoggerService) {
    super(logger);
  }

  /**
   * Refers to {@link ISessionService}
   */
  loadPersistentData(): void {
    super.loadPersistentData();
    this.loadNotificationTopics();
  }

  /**
   * Refers to {@link SessionsServiceCommon}
   */
  loadLocalUser(): void {
    const user = getNumber('userId', -1);
    if (!isNaN(user) && +user >= 0) {
      this.localUser = +user;
      this.logger.info(this, 'Local user found with ID: ' + this.localUser);
    } else {
      this.localUser = -1;
    }
  }

  /**
   * Refers to {@link SessionsServiceCommon}
   */
  storeLocalUser(): void {
    if (!isNaN(this.localUser) && this.localUser >= 0) {
      setNumber('userId', this.localUser);
    } else {
      this.localUser = -1;
      this.clearLocalUser();
    }
    this.logger.info(this, 'Store user to local storage with ID: ' + this.localUser);
  }

  /**s
   * Refers to {@link SessionsServiceCommon}
   */
  clearLocalUser(): void {
    remove('userId');
    this.logger.info(this, 'Local user cleared.');
  }

  /**
   * Add new notification's topic to the list and save the list on persistent data.
   */
  public storeNotificationTopic(topic: string): void {
    if (this.topics.indexOf(topic) === -1) {
      this.topics.push(topic);
      this.saveNotificationTopics();
    }
  }

  /**
   * Remove a notification's topic to the list and save the list on persistent data.
   * @param topic
   */
  public removeNotificationTopic(topic: string): void {
    if (this.topics.indexOf(topic) !== -1) {
      this.topics.splice(this.topics.indexOf(topic), 1);
      this.saveNotificationTopics();
    }
  }

  /**
   * Load saved subscribed notification's topics list.
   */
  private loadNotificationTopics(): void {
    const topics: {topics: string[]} = JSON.parse(getString('notificationTopics', '[]'));
    if (topics && topics.topics && topics.topics.length > 0) {
      this.logger.debug(this, 'Loading topics, topic length: ' + topics.topics.length);
      this.topics = topics.topics;
    } else {
      this.logger.debug(this, 'Loading topics, no topics found.');
      this.topics = [];
    }
  }

  /**
   * Save the current notification's topics list in the persistent data.
   */
  private saveNotificationTopics(): void {
    const topics = JSON.stringify({topics: this.topics});
    this.logger.debug(this, 'Saving topics, JSON: ' + topics);
    setString('notificationTopics', topics);
  }
}
