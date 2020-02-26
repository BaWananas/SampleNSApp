import {Component} from '@angular/core';
import {HttpService} from '@arhs/core';
import {isAndroid, Page} from '@nativescript/core';
import * as statusBar from 'nativescript-status-bar';
import {ApplicationEventData, on} from 'tns-core-modules/application';
import {RouterExtensions} from '@nativescript/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.tns.html',
  styleUrls: [
      './app.component.css',
  ]
})
export class AppComponent {

  constructor(private httpService: HttpService, private routerExtensions: RouterExtensions) {
    httpService.rootUrl = 'http://10.0.2.2:8080/';
    AppComponent.hideAndroidStatusBar();

    on('resume', (args: ApplicationEventData) => {
      if (args.android) {
        AppComponent.hideAndroidStatusBar();
      }
    }, this);
  }
  title: String = 'Sample Tns-Ang App';

  private static hideAndroidStatusBar(): void {
    if (isAndroid) {
      statusBar.hide();
    }
  }
}
