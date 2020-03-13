import {TestBed} from '@angular/core/testing';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';

describe('LoggerService', () => {
    let service: LoggerService;

    beforeEach(() => {
        service = TestBed.get(LoggerService);
    });

    describe('debug, info methods', () => {
        it('should call console.log', function () {
            console.log = jasmine.createSpy('log');
            service.debug(this, '');
            service.info(this, '');

            expect(console.log).toHaveBeenCalledTimes(2);
        });
    });

    describe('warn method', () => {
        it('should call console.warn', function () {
            console.warn = jasmine.createSpy('warn');
            service.warn(this, '');

            expect(console.warn).toHaveBeenCalled();
        });
    });

    describe('error method', () => {
        it('should call console.error', function () {
            console.error = jasmine.createSpy('error');
            service.error(this, '');

            expect(console.error).toHaveBeenCalled();
        });
    });
});
