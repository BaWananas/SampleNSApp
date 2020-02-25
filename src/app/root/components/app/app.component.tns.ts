import {Component} from '@angular/core';
import {HttpService} from '@arhs/core';
import {EventData, Page, isAndroid} from '@nativescript/core';
import * as statusBar from 'nativescript-status-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.tns.html',
  styleUrls: [
      './app.component.css',
  ]
})
export class AppComponent {

  constructor(private httpService: HttpService) {
    httpService.rootUrl = 'http://10.0.2.2:8080/';
    AppComponent.hideAndroidStatusBar();
  }
  title: String = 'Sample Tns-Ang App';

  private static hideAndroidStatusBar(): void {
    if (isAndroid) {
      statusBar.hide();
    }
  }

  public onPageLoaded(args: EventData): void {
    const page = <Page>args.object;
    page.actionBarHidden = true;
  }
}
