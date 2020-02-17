import {Component} from '@angular/core';
import {HttpService} from '@arhs/core';
import { EventData, Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
      './app.component.css',
  ]
})
export class AppComponent {
  title: String = 'Sample Tns-Ang App';

  constructor(private httpService: HttpService) {
    httpService.rootUrl = 'http://10.0.2.2:8080/';
  }

  public onPageLoaded(args: EventData): void {
    const page = <Page>args.object;
    page.actionBarHidden = true;
  }
}
