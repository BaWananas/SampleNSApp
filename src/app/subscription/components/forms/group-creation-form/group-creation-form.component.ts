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
