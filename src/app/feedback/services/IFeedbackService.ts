/**
 * Service used to send feedback to the user.
 *
 * Could be moved in the @arhs/ui module in the future ?
 */
export interface IFeedbackService {
    /**
     * Notify an error.
     * @param error The error.
     * @param expendable Is error can be expanded ?
     * @returns string | undefined Returns a unique reference to cancel/hide this feedback,
     * or undefined if only one feedback a the same time was supported.
     */
    notifyError(error: any, expendable?: boolean): string;

    /**
     * Inform the user.
     * @param title Required title for the feedback.
     * @param message An optional message to complete the feedback.
     * @returns string | undefined Returns a unique reference to cancel/hide this feedback,
     * or undefined if only one feedback a the same time was supported.
     */
    notifyInfo(title: string, message?: string): string;

    /**
     * Warn the user.
     * @param title Required title for the feedback.
     * @param message An optional message to complete the feedback.
     * @returns string | undefined Returns a unique reference to cancel/hide this feedback,
     * or undefined if only one feedback a the same time was supported.
     */
    notifyWarning(title: string, message?: string): string;

    /**
     * Inform the user on a success.
     * @param title Required title for the feedback.
     * @param message An optional message to complete the feedback.
     * @returns string | undefined Returns a unique reference to cancel/hide this feedback,
     * or undefined if only one feedback a the same time was supported.
     */
    notifySuccess(title: string, message?: string): string;

    /**
     * Notify the user with a custom notification.
     * @param options Options for the feedback.
     * @returns string | undefined Returns a unique reference to cancel/hide this feedback,
     * or undefined if only one feedback a the same time was supported.
     */
    notifyCustom(options: any): string;

    /**
     * Hide or cancel a feedback.
     * @param feedbackReference Unique reference of the feedback.
     */
    hideFeedbackNotification(feedbackReference: string): void;
}
