import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';

export abstract class AppCommon {

    protected constructor(protected authenticationService: IAuthenticationService) {
    }

    public isOnSecuredPage(): boolean {
        if (this.authenticationService.getAuthenticatedUserId() === -1) {
            return true;
        } else {
            return false;
        }
    }

    public abstract logout(): void;
}
