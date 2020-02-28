import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {ISessionService} from '@src/app/shared/services/ISessionService';

export abstract class SessionsServiceCommon implements ISessionService {

    user = -1;

    protected constructor(protected logger: ILoggerService) {
    }

    public loadPersistentData(): void {
        this.logger.info(this, 'Load data from local session.')
        this.loadLocalUser();
    }

    abstract loadLocalUser(): void;
    abstract storeLocalUser(): void;
    abstract clearLocalUser(): void;
}
