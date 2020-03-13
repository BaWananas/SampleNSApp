import {LoginPageComponent} from '@src/app/authentication/components/login/login-page/login-page.component';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';
import {RouterTestingModule} from '@angular/router/testing';
import {AppModule} from '@src/app/root/app.module';
import createSpy = jasmine.createSpy;

describe('LoginPage component class', function () {
    let component: LoginPageComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
           providers: [
               SessionService,
               AuthenticationService,
               FeedbackService,
               LoginPageComponent,
           ],
            imports: [
                RouterTestingModule,
                AppModule
            ]
        });
        component = TestBed.get(LoginPageComponent);
    });

    describe('onSubmit method', () => {
        it('should navigate only if login succeeds', function () {
            const router: Router = TestBed.get(Router);
            router.navigate = createSpy('navigate');

            component.onSubmit(false);
            expect(router.navigate).not.toHaveBeenCalled();

            component.onSubmit(true);
            expect(router.navigate).toHaveBeenCalled();
        });

        it('should only warn if login fails', function () {
            const feedback: FeedbackService = TestBed.get(FeedbackService);
            feedback.notifyWarning = createSpy('notifyWarning');

            component.onSubmit(true);
            expect(feedback.notifyWarning).not.toHaveBeenCalled();

            component.onSubmit(false);
            expect(feedback.notifyWarning).toHaveBeenCalled();
        });

        it('should redirected only if already authenticated', function () {
            const router: Router = TestBed.get(Router);
            const auth: IAuthenticationService = TestBed.get(AuthenticationService);
            router.navigate = createSpy('navigate');

            component.ngOnInit();
            expect(router.navigate).not.toHaveBeenCalled();

            auth.signIn(1);
            component.ngOnInit();
            expect(router.navigate).toHaveBeenCalled();
        });
    });
});
