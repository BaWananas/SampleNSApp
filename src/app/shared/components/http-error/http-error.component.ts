import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-http-error',
  templateUrl: './http-error.component.html',
  styleUrls: ['./http-error.component.css']
})
export class HttpErrorComponent implements OnInit {

  @Input() error: HttpErrorResponse;
  @Output() public retryEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  toJson(): void {
    this.copyText(JSON.stringify(this.error));
  }

  retry(): void {
    this.retryEvent.emit(true);
  }

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
