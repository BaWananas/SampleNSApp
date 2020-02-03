import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '@src/app/subscription/models/Group';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-group-creation-form',
  templateUrl: './group-creation-form.component.html',
  styleUrls: ['./group-creation-form.component.css']
})
export class GroupCreationFormComponent implements OnInit {
  @Output() createEvent: EventEmitter<Group> = new EventEmitter<Group>();

  groupCreationForm = this.builder.group({
    groupName: ['Name', Validators.required],
    groupDescription: [''],
    associationId: ['', Validators.required],
  });

  constructor(private builder: FormBuilder) {}

  ngOnInit() {
  }

  onSubmit(): void {
    this.createEvent.emit(new Group(this.groupCreationForm.value.associationId,
        this.groupCreationForm.value.groupName,
        this.groupCreationForm.value.groupDescription));
  }
}
