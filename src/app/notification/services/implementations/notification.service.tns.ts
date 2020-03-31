import {Injectable} from '@angular/core';
import {INotificationService} from '@src/app/notification/services/INotificationService';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service.tns';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';

/**
 * Firebase plugin.
 */
const firebase = require('nativescript-plugin-firebase');

/**
 * Refers to {@link INotificationService}
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationService implements INotificationService {

    /*
    Services
     */
    /**
     * @ignore
     */
    private logger: ILoggerService;

    /**
     * Refers to {@link INotificationService}
     */
    constructor(private sessionService: SessionService, logger: LoggerService) {
        this.logger = logger;
    }

    /**
     * Refers to {@link INotificationService}
     */
    isSubscribedToTopic(topic: string): boolean {
        return (this.sessionService.topics.indexOf(topic) !== -1);
    }

    /**
     * Refers to {@link INotificationService}
     */
    subscribeToTopic(topic: string): void {
        firebase.subscribeToTopic(topic).then(value => {
            this.logger.info(this, 'Successfully subscribed to topic ' + topic);
            this.sessionService.storeNotificationTopic(topic);
        }, reason => {
            this.logger.error(this, 'Error occurred during topic ' + topic + 'subscription. Reason: ' + reason);
        });
    }

    /**
     * Refers to {@link INotificationService}
     */
    unsubscribeToTopic(topic: string): void {
        firebase.unsubscribeFromTopic(topic).then(value => {
            this.logger.info(this, 'Successfully unsubscribed to topic ' + topic);
            this.sessionService.removeNotificationTopic(topic);
        }, reason => {
            this.logger.error(this, 'Error occurred during topic ' + topic + 'unsubscription. Reason: ' + reason);
        });
    }
}
