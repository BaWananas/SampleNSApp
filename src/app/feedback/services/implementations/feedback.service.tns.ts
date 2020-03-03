import { Injectable } from '@angular/core';
import {Feedback, FeedbackShowOptions} from 'nativescript-feedback';
import {HttpError} from '@arhs/core';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';

/**
 * Implementation of IFeedbackService for mobile platforms.
 */
@Injectable({
  providedIn: 'root'
})
export class FeedbackService implements IFeedbackService {

  /**
   * Constructor.
   */
  constructor() {
  }

  /**
   * A default feedback duration.
   */
  private static defaultDurationMs = 1500;

  /**
   * Current feedback list.
   */
  private feedbackList: {feedbackReference: string, feedback: Feedback}[] = [];

  /**
   * Create an empty feedback.
   * @returns Empty feedback.
   */
  private static createFeedback(): Feedback {
    return new Feedback();
  }

  /**
   * TODO
   * Expand the feedback for displaying error details.
   * @param error
   */
  private static expendError(error: HttpError): void {
    // TODO
  }

  /**
   * Store a new feedback in the feedback list.
   * @param feedback The feedback.
   * @returns Unique id for the feedback.
   */
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

  /**
   * Remove a feedback from the feedback list.
   * @param feedbackReference The unique id of the feedback.
   */
  private removeFeedback(feedbackReference: string): void {
    const index = this.getFeedbackIndex(feedbackReference);
    if (index >= 0) {
      this.feedbackList.splice(index, 1);
    }
  }

  /**
   * Get the index of a feedback by using his unique ID.
   * @param feedbackReference Unique feedback ID.
   * @returns number The index; return -1 if feedback wasn't found
   */
  private getFeedbackIndex(feedbackReference: string): number {
    let index = -1;
    this.feedbackList.forEach((value, i) => {
      if (value.feedbackReference === feedbackReference) {
        index = i;
      }
    });
    return index;
  }

  /**
   * Make sure that only one feedback can exist at the same time.
   */
  private enforceSingleFeedback(): void {
    this.feedbackList.forEach(value => {
      this.hideFeedbackNotification(value.feedbackReference);
    });
  }

  /**
   * Refers to {@link IFeedbackService}
   * @param options
   */
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

  /**
   * Refers to {@link IFeedbackService}
   * @param error
   * @param expendable
   */
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

  /**
   * Refers to {@link IFeedbackService}
   * @param title
   * @param message
   */
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

  /**
   * Refers to {@link IFeedbackService}
   * @param title
   * @param message
   */
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

  /**
   * Refers to {@link IFeedbackService}
   * @param title
   * @param message
   */
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

  /**
   * Refers to {@link IFeedbackService}
   * @param feedbackReference
   */
  hideFeedbackNotification(feedbackReference: string): void {
    const index = this.getFeedbackIndex(feedbackReference);
    if (index >= 0) {
      this.feedbackList[index].feedback.hide();
      this.removeFeedback(feedbackReference);
    }
  }
}
