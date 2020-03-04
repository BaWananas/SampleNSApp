import {Component, OnInit} from '@angular/core';
import {HttpService} from '@arhs/core';
import {Router} from '@angular/router';
import {faHome, faSignOutAlt, faUsers} from '@fortawesome/free-solid-svg-icons';
import {faAngular} from '@fortawesome/free-brands-svg-icons';
import {AppCommon} from '@src/app/root/components/app/app.common';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

/**
 * Root component. Entrance of the App.
 *
 * Extends {@link AppCommon}.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
      './app.component.css',
  ]
})
export class AppComponent extends AppCommon implements OnInit {

  /**
   * Icon.
   */
  angularIcon = faAngular;
  /**
   * Icon.
   */
  logOutIcon = faSignOutAlt;
  /**
   * Icon.
   */
  homeIcon = faHome;
  /**
   * Icon.
   */
  subscriptionIcon = faUsers;

  /**
   * Constructor.
   * @param httpService Service used to Http CRUD operations.
   * @param router Angular router.
   * @param authenticationService Service related to user authentication.
   * @param sessionService Service used for sessions and data persistence.
   */
  constructor(private httpService: HttpService,
              private router: Router,
              authenticationService: AuthenticationService,
              sessionService: SessionService) {
    super(authenticationService, sessionService);
    httpService.rootUrl = 'http://10.66.0.21:9700/';
  }

  /**
   * Refers to {@link AppCommon}
   */
  logout(): void {
    this.authenticationService.signOut();
    this.router.navigate(['']);
  }

  /**
   * Refers to {@link OnInit}
   */
  ngOnInit(): void {
    super.ngOnInit();
  }

  /**
   * Refers to {@link AppCommon}
   */
  protected redirectToHomePage(): void {
    this.router.navigate(['']);
  }

  /**
   * Refers to {@link AppCommon}
   */
  protected redirectToLoginPage(): void {
    this.router.navigate(['login']);
  }
}
