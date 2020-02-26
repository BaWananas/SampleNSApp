import {Injectable} from '@angular/core';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';

@Injectable({
  providedIn: 'root'
})
// TODO
export class FeedbackService implements IFeedbackService {

  constructor() {
  }

  hideFeedbackNotification(feedbackReference: string): void {
  }

  notifyCustom(options: any): string {
    return '';
  }

  notifyError(error: any, expendable?: boolean): string {
    return '';
  }

  notifyInfo(title: string, message?: string): string {
    return '';
  }

  notifySuccess(title: string, message?: string): string {
    return '';
  }

  notifyWarning(title: string, message?: string): string {
    return '';
  }
}
