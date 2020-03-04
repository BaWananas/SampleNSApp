import {ISessionService} from '@src/app/shared/services/ISessionService';

/**
 * Shared part of the login page component.
 *
 * Show the login form and perform the redirection.
 */
export abstract class LoginPageCommon {

    /**
     * Constructor.
     * @param sessionService Refers to {@link ISessionService}
     */
    protected constructor(protected sessionService: ISessionService) {
    }

    /**
     * Called when the login form was submitted. Perform the redirection.
     */
    abstract onSubmit(succeeds: boolean): void;
}
