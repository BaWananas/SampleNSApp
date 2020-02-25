import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Group} from '@arhs/core';

@Component({
  selector: 'app-group-creation-form',
  templateUrl: './group-creation-form.component.html',
  styleUrls: ['./group-creation-form.component.css']
})
export class GroupCreationFormComponent implements OnInit {
  @Output() createEvent: EventEmitter<Group> = new EventEmitter<Group>();

  public groupCreationForm = this.builder.group({
    name: ['', Validators.required],
    description: [''],
    associationId: ['', Validators.required]
  });

  constructor(private builder: FormBuilder) {}

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.groupCreationForm.valid) {
      const group: Group = new Group(this.groupCreationForm.value.associationId,
          this.groupCreationForm.value.name,
          this.groupCreationForm.value.description);
      this.createEvent.emit(group);
    }
  }
}
