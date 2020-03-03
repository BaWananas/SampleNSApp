import {Injectable} from '@angular/core';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpError} from '@arhs/core';
import {ClipboardService} from 'ngx-clipboard';

/**
 * Implementation of {@link IFeedbackService} for web platform.
 */
@Injectable({
  providedIn: 'root'
})
export class FeedbackService implements IFeedbackService {

  /**
   * Constructor.
   * @param snackBar Angular material snackbar.
   * @param clipboard Ngx-Clipboard library.
   */
  constructor(private snackBar: MatSnackBar,
              private clipboard: ClipboardService) {
  }

  /**
   * Refers to {@link IFeedbackService}
   * @param feedbackReference
   */
  hideFeedbackNotification(feedbackReference: string): void {
    this.snackBar.dismiss();
  }

  /**
   * Refers to {@link IFeedbackService}
   * @param options
   */
  notifyCustom(options: any): string {
    this.snackBar.open(options.title, options.message, options);
    return undefined;
  }

  /**
   * Refers to {@link IFeedbackService}
   * @param error
   * @param expendable
   */
  notifyError(error: any, expendable?: boolean): string {
    if (error && error instanceof HttpError) {
      const formattedError = <HttpError>error;

      this.snackBar.open(formattedError.message, (formattedError.debugMessage) ? 'Copy trace in clipboard' : 'OK', {
        horizontalPosition: 'right',
        direction: 'ltr',
        announcementMessage: 'Error occurred : ' + formattedError.message,
        politeness: 'polite',
        duration: 2000,
        panelClass: 'text-danger'
      }).onAction().subscribe(() => {
        this.clipboard.copyFromContent(formattedError.debugMessage ? formattedError.debugMessage : 'No stacktrace available.');
      });
    } else if (error instanceof Error) {
      this.snackBar.open(error.message, (error.stack) ? 'Copy trace in clipboard' : 'OK', {
        horizontalPosition: 'right',
        direction: 'ltr',
        announcementMessage: 'Error occurred : ' + error.message,
        politeness: 'polite',
        duration: 2000,
        panelClass: 'text-danger'
      }).onAction().subscribe(() => {
        this.clipboard.copyFromContent(error.stack ? error.stack : 'No stacktrace available.');
      });
    }
    return undefined;
  }

  /**
   * Refers to {@link IFeedbackService}
   * @param title
   * @param message
   */
  notifyInfo(title: string, message?: string): string {
    this.snackBar.open(title, (message) ? message : 'OK', {
      horizontalPosition: 'right',
      direction: 'ltr',
      announcementMessage: 'Informational message : ' + message,
      politeness: 'polite',
      duration: 1500,
    });
    return undefined;
  }

  /**
   * Refers to {@link IFeedbackService}
   * @param title
   * @param message
   */
  notifySuccess(title: string, message?: string): string {
    this.snackBar.open(title, (message) ? message : 'OK', {
      horizontalPosition: 'right',
      direction: 'ltr',
      announcementMessage: 'Success message : ' + message,
      politeness: 'polite',
      panelClass: 'text-success',
      duration: 1500,
    });
    return undefined;
  }

  /**
   * Refers to {@link IFeedbackService}
   * @param title
   * @param message
   */
  notifyWarning(title: string, message?: string): string {
    this.snackBar.open(title, (message) ? message : 'OK', {
      horizontalPosition: 'right',
      direction: 'ltr',
      announcementMessage: 'Warning : ' + message,
      politeness: 'polite',
      panelClass: 'text-warning',
      duration: 1500,
    });
    return undefined;
  }

}
