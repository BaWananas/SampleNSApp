import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {ISessionService} from '@src/app/shared/services/ISessionService';

/**
 * Implementation of {@link ISessionService}.
 *
 * Shared part of SessionService.
 */
export abstract class SessionsServiceCommon implements ISessionService {

    /**
     * Refers to {@link ISessionService}
     */
    public localUser = -1;

    /**
     * Constructor.
     * Refers to {@link ISessionService}
     * @param logger
     */
    protected constructor(protected logger: ILoggerService) {
    }

    /**
     * Refers to {@link ISessionService}
     */
    public loadPersistentData(): void {
        this.logger.info(this, 'Load data from local session.');
        this.loadLocalUser();
    }

    /**
     * Refers to {@link ISessionService}
     */
    abstract loadLocalUser(): void;

    /**
     * Refers to {@link ISessionService}
     */
    abstract storeLocalUser(): void;

    /**
     * Refers to {@link ISessionService}
     */
    abstract clearLocalUser(): void;
}
