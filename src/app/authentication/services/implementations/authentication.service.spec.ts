import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {TestBed} from '@angular/core/testing';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoggerService, SessionService]
        });
        service = TestBed.get(AuthenticationService);
    });

    describe('signIn method', () => {

        it('should signIn return true when id >= 0', function () {
            expect(service.signIn(0)).toBe(true);
            expect(service.signIn(1)).toBe(true);
            expect(service.signIn(50000)).toBe(true);
        });

        it('should signIn return false when id < 0 or id NaN', function () {
            expect(service.signIn(-1)).toBe(false);
            expect(service.signIn(NaN)).toBe(false);
        });

        it('should save user when id == 0', function () {
            service.signIn(0);
            const sessionService: SessionService = TestBed.get(SessionService);

            expect(service["authenticatedUser"]).toBe(0);
            expect(sessionService.localUser).toBe(0);
        });

        it('should save user when id > 0', function () {
            service.signIn(1);
            const sessionService: SessionService = TestBed.get(SessionService);

            expect(service["authenticatedUser"]).toBe(1);
            expect(sessionService.localUser).toBe(1);
        });

        it('should not save user when id < 0', function () {
            service.signIn(-1);
            const sessionService: SessionService = TestBed.get(SessionService);

            expect(service["authenticatedUser"]).toBe(-1);
            expect(sessionService.localUser).toBe(-1);
        });

    });

    describe('signOut method', () => {
        it('should reset the authenticated user', function () {
            service.signOut();
            const sessionService: SessionService = TestBed.get(SessionService);

            expect(service["authenticatedUser"]).toBe(-1);
            expect(sessionService.localUser).toBe(-1);
        });
    });

    describe('isAuthenticated method', () => {
        it('should return true if authenticated', function () {
            service.signIn(1);
            expect(service.isAuthenticated()).toBe(true);
        });

        it('should return false if not authenticated', function () {
            service.signOut();
            expect(service.isAuthenticated()).toBe(false);
        });
    });
});
