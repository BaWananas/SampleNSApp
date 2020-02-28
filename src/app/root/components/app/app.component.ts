import {Component, OnInit} from '@angular/core';
import {HttpService} from '@arhs/core';
import {Router} from '@angular/router';
import {faHome, faSignOutAlt, faUsers} from '@fortawesome/free-solid-svg-icons';
import {faAngular} from '@fortawesome/free-brands-svg-icons';
import {AppCommon} from '@src/app/root/components/app/app.common';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
      './app.component.css',
  ]
})
export class AppComponent extends AppCommon implements OnInit {

  angularIcon = faAngular;
  logOutIcon = faSignOutAlt;
  homeIcon = faHome;
  subscriptionIcon = faUsers;

  constructor(private httpService: HttpService,
              private router: Router,
              authenticationService: AuthenticationService,
              sessionService: SessionService) {
    super(authenticationService, sessionService);
    httpService.rootUrl = 'http://10.66.0.21:9700/';
  }

  logout(): void {
    this.authenticationService.signOut();
    this.router.navigate(['']);
  }


  ngOnInit(): void {
    super.ngOnInit();
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
    }
  }
}
