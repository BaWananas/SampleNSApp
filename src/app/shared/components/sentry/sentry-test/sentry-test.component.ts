import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-sentry-test',
  templateUrl: './sentry-test.component.html',
  styleUrls: ['./sentry-test.component.css']
})
export class SentryTestComponent implements OnInit {

  public throwErrorForm = this.formBuilder.group({
    message: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  public throwError(): void {
    if (this.throwErrorForm.valid) {
      throw new Error(this.throwErrorForm.value.message);
    }
  }

}
