import {ISessionService} from '@src/app/shared/services/ISessionService';

export abstract class LoginPageCommon {

    protected constructor(protected sessionService: ISessionService) {
    }

    abstract onSubmit(): void;
}
