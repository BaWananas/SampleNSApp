import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';
import {OnInit} from '@angular/core';
import {ISessionService} from '@src/app/shared/services/ISessionService';

/**
 * Shared part of AppComponent.
 */
export abstract class AppCommon implements OnInit {

    /**
     * Constructor.
     * @param authenticationService Service related to user authentication.
     * @param sessionService Service used for sessions and data persistence.
     */
    protected constructor(protected authenticationService: IAuthenticationService,
                          protected sessionService: ISessionService) {
    }

    /**
     * Is the user authenticated ?
     */
    public isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }

    /**
     * Sign out the user and do the cleaning/saving part.
     */
    public abstract logout(): void;

    /**
     * Redirect the user to the login Page.
     *
     * Used if the user wasn't logged.
     */
    protected abstract redirectToLoginPage(): void;

    /**
     * Redirect the user to the home Page.
     *
     * Used if the user was already logged.
     */
    protected abstract redirectToHomePage(): void;

    /**
     * Refers to {@OnInit}
     *
     * Load persistent data, try login if user account found in the local storage, and redirect to the right place.
     */
    ngOnInit(): void {
        this.sessionService.loadPersistentData();

        if (this.authenticationService.signIn(this.sessionService.localUser)) {
            this.redirectToHomePage();
        } else {
            this.redirectToLoginPage();
        }
    }
}
