import {Component} from '@angular/core';
import {HttpService} from '@arhs/core';
import {AppCommon} from '@src/app/root/components/app/app.common';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {Router} from '@angular/router';
import {faHome, faSignOutAlt, faUsers} from '@fortawesome/free-solid-svg-icons';
import {faAngular} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
      './app.component.css',
  ]
})
export class AppComponent extends AppCommon {

  angularIcon = faAngular;
  logOutIcon = faSignOutAlt;
  homeIcon = faHome;
  subscriptionIcon = faUsers;

  constructor(private httpService: HttpService,
              private router: Router,
              authenticationService: AuthenticationService) {
    super(authenticationService);
    httpService.rootUrl = 'http://localhost:8080/';
  }

  logout(): void {
    this.authenticationService.signOut();
    this.router.navigate(['']);
  }
}
