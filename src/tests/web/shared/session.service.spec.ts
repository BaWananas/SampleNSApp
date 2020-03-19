import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';
import {TestBed} from '@angular/core/testing';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {AppModule} from '@src/app/root/app.module';

describe('Sessions service', () => {
    let service: SessionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoggerService
            ],
            imports: [
                AppModule
            ]
        });
        service = TestBed.get(SessionService);
    });

    it('should store, load and clear LocalUser', function () {
        service.localUser = 5;
        service.storeLocalUser();
        service.loadLocalUser();
        expect(service.localUser).toBe(5);
        service.clearLocalUser();
        service.loadLocalUser();
        expect(service.localUser).toBe(-1);
    });
});
