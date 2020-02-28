import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';
import {OnInit} from '@angular/core';
import {ISessionService} from '@src/app/shared/services/ISessionService';

export abstract class AppCommon implements OnInit {

    protected constructor(protected authenticationService: IAuthenticationService,
                          protected sessionService: ISessionService) {
    }

    public isAuthenticated(): boolean {
        return (this.sessionService.user >= 0);
    }

    public abstract logout(): void;

    ngOnInit(): void {
        this.sessionService.loadPersistentData();
    }
}
