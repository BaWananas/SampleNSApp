import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpError} from '@arhs/core';

/**
 * Not used anymore.
 *
 * Previously used to display errors.
 * @deprecated
 */
@Component({
  selector: 'app-http-error',
  templateUrl: './http-error.component.html',
  styleUrls: ['./http-error.component.css']
})
export class HttpErrorComponent implements OnInit {

  /**
   * Error.
   */
  @Input() error: HttpError;
  /**
   * Is retry was enabled ?
   */
  @Input('retry') enableRetry = false;
  /**
   * Event triggered when retry was requested.
   */
  @Output() retryEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Constructor.
   */
  constructor() {
  }

  /**
   * Refers to {@link OnInit}
   */
  ngOnInit() {
  }

  /**
   * Copy error trace to clipboard.
   */
  toJson(): void {
    this.copyText(JSON.stringify(this.error));
  }

  /**
   * Retry the action that emits error.
   */
  retry(): void {
    this.retryEvent.emit(true);
  }

  /**
   * Deprecated, use ngx-clipboard now.
   *
   * Copy Text to clipboard.
   * @deprecated
   * @param val
   */
  private copyText(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
