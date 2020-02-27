import { Injectable } from '@angular/core';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public sideDrawer: RadSideDrawerComponent;

  constructor() { }
}
