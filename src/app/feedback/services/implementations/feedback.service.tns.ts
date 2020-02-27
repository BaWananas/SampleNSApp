import { Injectable } from '@angular/core';
import {Feedback, FeedbackShowOptions} from 'nativescript-feedback';
import {HttpError} from '@arhs/core';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService implements IFeedbackService {

  constructor() {
  }

  private static defaultDurationMs = 4000;

  private feedbackList: {feedbackReference: string, feedback: Feedback}[] = [];

  private static createFeedback(): Feedback {
    return new Feedback();
  }

  private static expendError(error: HttpError): void {
    // TODO
  }

  private storeFeedback(feedback: Feedback): string {
    this.enforceSingleFeedback();
    let uniqueId = 0;
    const feedbackReference = 'TIME_MS:' + Date.now() + ';UNIQUE_ID:';

    while (this.getFeedbackIndex(feedbackReference + uniqueId) !== -1) {
      uniqueId = uniqueId + 1;
    }

    this.feedbackList.unshift({
      feedbackReference: feedbackReference + uniqueId,
      feedback: feedback
    });
    return feedbackReference + uniqueId;
  }

  private removeFeedback(feedbackReference: string): void {
    const index = this.getFeedbackIndex(feedbackReference);
    if (index >= 0) {
      this.feedbackList.splice(index, 1);
    }
  }

  private getFeedbackIndex(feedbackReference: string): number {
    let index = -1;
    this.feedbackList.forEach((value, i) => {
      if (value.feedbackReference === feedbackReference) {
        index = i;
      }
    });
    return index;
  }

  private enforceSingleFeedback(): void {
    this.feedbackList.forEach(value => {
      this.hideFeedbackNotification(value.feedbackReference);
    });
  }

  notifyCustom(options: FeedbackShowOptions): string {
    const feedback = FeedbackService.createFeedback();
    const feedbackReference = this.storeFeedback(feedback);
    const onHide = () => {
      this.removeFeedback(feedbackReference);
      options.onHide();
    };
    options.onHide = onHide;

    feedback.show(options);
    return feedbackReference;
  }

  notifyError(error: any, expendable?: boolean): string {
    const feedback = FeedbackService.createFeedback();
    const feedbackReference = this.storeFeedback(feedback);

    if (error && error instanceof HttpError) {
      const formattedError = <HttpError>error;

      feedback.error({
        title: 'Oops something went wrong...',
        message: formattedError.message,
        duration: FeedbackService.defaultDurationMs,
        onTap: () => {
          FeedbackService.expendError(formattedError);
        },
        onHide: () => {
          this.removeFeedback(feedbackReference);
        }
      });
    } else if (error instanceof Error) {
      feedback.error({
        title: 'Oops something went wrong...',
        message: error.message,
        duration: FeedbackService.defaultDurationMs,
        onHide: () => {
          this.removeFeedback(feedbackReference);
        }
      });
    }
    return feedbackReference;
  }

  notifyInfo(title: string, message?: string): string {
    const feedback = FeedbackService.createFeedback();
    const feedbackReference = this.storeFeedback(feedback);

    feedback.info({
      title: title,
      message: message,
      duration: FeedbackService.defaultDurationMs,
      onHide: () => {
        this.removeFeedback(feedbackReference);
      }
    });
    return feedbackReference;
  }

  notifySuccess(title: string, message?: string): string {
    const feedback = FeedbackService.createFeedback();
    const feedbackReference = this.storeFeedback(feedback);

    feedback.success({
      title: title,
      message: message,
      duration: FeedbackService.defaultDurationMs,
      onHide: () => {
        this.removeFeedback(feedbackReference);
      }
    });
    return feedbackReference;
  }

  notifyWarning(title: string, message?: string): string {
    const feedback = FeedbackService.createFeedback();
    const feedbackReference = this.storeFeedback(feedback);

    feedback.warning({
      title: title,
      message: message,
      duration: FeedbackService.defaultDurationMs,
      onHide: () => {
        this.removeFeedback(feedbackReference);
      }
    });
    return feedbackReference;
  }

  hideFeedbackNotification(feedbackReference: string): void {
    const index = this.getFeedbackIndex(feedbackReference);
    if (index >= 0) {
      this.feedbackList[index].feedback.hide();
      this.removeFeedback(feedbackReference);
    }
  }
}
