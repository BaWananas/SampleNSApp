import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

/**
 * Only for testing/demo purpose.
 *
 * Demonstration of sentry utilization.
 */
@Component({
  selector: 'app-sentry-test',
  templateUrl: './sentry-test.component.html',
  styleUrls: ['./sentry-test.component.css']
})
export class SentryTestComponent implements OnInit {

  /**
   * Form for throwing an error.
   */
  public throwErrorForm = this.formBuilder.group({
    message: ['', Validators.required]
  });

  /**
   * Constructor.
   * @param formBuilder
   */
  constructor(private formBuilder: FormBuilder) { }

  /**
   * Refers to {@OnInit}
   */
  ngOnInit() {
  }

  /**
   * Throw an error.
   */
  public throwError(): void {
    if (this.throwErrorForm.valid) {
      throw new Error(this.throwErrorForm.value.message);
    }
  }

}
