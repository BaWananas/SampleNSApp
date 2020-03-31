/**
 * Service in charge of
 */
export interface INotificationService {
    /**
     * Is this device is currently subscribed to the specified topic.
     * @param topic
     */
    isSubscribedToTopic(topic: string): boolean;

    /**
     * Subscribe to a topic.
     * @param topic
     */
    subscribeToTopic(topic: string): void;

    /**
     * Unsubscribe to a topic.
     * @param topic
     */
    unsubscribeToTopic(topic: string): void;
}
