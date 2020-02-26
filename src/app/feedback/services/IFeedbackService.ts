export interface IFeedbackService {
    notifyError(error: any, expendable?: boolean): string;
    notifyInfo(title: string, message?: string): string;
    notifyWarning(title: string, message?: string): string;
    notifySuccess(title: string, message?: string): string;
    notifyCustom(options: any): string;
    hideFeedbackNotification(feedbackReference: string): void;
}
