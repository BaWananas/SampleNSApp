import { Component, OnInit } from '@angular/core';
import {Group} from '@src/app/subscription/models/Group';
import {GroupServiceService} from '@src/app/subscription/services/implementations/group-service.service';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-groups-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groups: Group[] = [];
  groupsError: HttpErrorResponse;
  loggerService: ILoggerService;

  constructor(private groupService: GroupServiceService, loggerService: LoggerService) {
    this.loggerService = loggerService;
  }

  ngOnInit() {
    this.getGroups();
  }

  private getGroups() {
    this.groups = [];
    this.groupsError = null;
    this.loggerService.info(this, 'Retrieving groups.');

    this.groupService.getAllGroups().subscribe(value => {
      this.groups = value;
    }, (error: HttpErrorResponse) => {
      this.loggerService.error(this, 'Error during retrieving groups from API. Error: ' + JSON.stringify(error));
      this.groupsError = error;
    });
  }

}
