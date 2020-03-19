import {SentryTestComponent} from '@src/app/shared/components/sentry/sentry-test/sentry-test.component';
import {TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {AppModule} from '@src/app/root/app.module';

describe('SentryTest component', () => {
    let component: SentryTestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SentryTestComponent,
                FormBuilder
            ],
            imports: [
                AppModule
            ]
        });
        component = TestBed.get(SentryTestComponent);
    });

    it('should throw error when submitting', function () {
        try {
            component.throwError();
            fail();
        } catch (e) {
            // Event throwed, success !
            expect(true).toBe(true);
        }
    });
});
