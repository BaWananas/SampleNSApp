import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Group} from '@arhs/core';

/**
 * Form used for creating groups.
 */
@Component({
  selector: 'app-group-creation-form',
  templateUrl: './group-creation-form.component.html',
  styleUrls: ['./group-creation-form.component.css']
})
export class GroupCreationFormComponent implements OnInit {
  /**
   * Triggered when form submitted
   *
   * Send the group created by the form (not saved by the API).
   */
  @Output() createEvent: EventEmitter<Group> = new EventEmitter<Group>();

  /**
   * The group creation form.
   */
  public groupCreationForm = this.builder.group({
    name: ['', Validators.required],
    description: [''],
    associationId: ['', Validators.required]
  });

  /**
   * Constructor.
   * @param builder FormBuilder library service.
   */
  constructor(private builder: FormBuilder) {}

  /**
   * Refers to {@link OnInit}
   */
  ngOnInit() {
  }

  /**
   * Submit the form and emit the submission event.
   */
  submitForm(): void {
    if (this.groupCreationForm.valid) {
      const group: Group = new Group(this.groupCreationForm.value.associationId,
          this.groupCreationForm.value.name,
          this.groupCreationForm.value.description);
      this.createEvent.emit(group);
    }
  }
}
