import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from '@src/app/subscription/models/Subscription';
import {Group} from '@src/app/subscription/models/Group';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  group: Group;
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getGroup();
    this.getSubscriptions();
  }

  getGroup(): void {
    this.group = null;
  }

  getSubscriptions(): void {
    this.subscriptions = [];
  }

}
