import {SessionService} from '@src/app/root/services/implementation/session.service.tns';

export abstract class LoginPageCommon {

    protected constructor(protected sessionService: SessionService) {
    }

    abstract onSubmit(): void;
}
