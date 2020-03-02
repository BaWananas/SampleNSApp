import {Injectable} from '@angular/core';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpError} from '@arhs/core';
import {ClipboardService} from 'ngx-clipboard';

@Injectable({
  providedIn: 'root'
})
// TODO
export class FeedbackService implements IFeedbackService {

  constructor(private snackBar: MatSnackBar,
              private clipboard: ClipboardService) {
  }

  hideFeedbackNotification(feedbackReference: string): void {
    this.snackBar.dismiss();
  }

  notifyCustom(options: any): string {
    this.snackBar.open(options.title, options.message, options);
    return undefined;
  }

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

  private copyToClipboard(val: string): void {

  }

}
