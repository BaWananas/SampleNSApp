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
        return (this.sessionService.user >= 0);
    }

    /**
     * Sign out the user and do the cleaning/saving part.
     */
    public abstract logout(): void;

    /**
     * Refers to {@OnInit}
     *
     * Load persistent data.
     */
    ngOnInit(): void {
        this.sessionService.loadPersistentData();
    }
}
