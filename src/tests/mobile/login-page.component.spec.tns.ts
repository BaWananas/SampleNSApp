import {LoginPageComponent} from '@src/app/authentication/components/login/login-page/login-page.component.tns';
import {nsTestBedAfterEach, nsTestBedBeforeEach, nsTestBedRender} from 'nativescript-angular/testing';
import {ComponentFixture} from '@angular/core/testing';
import {RouterExtensions} from '@nativescript/angular';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';
import 'reflect-metadata';
import {AppModule} from '@src/app/root/app.module.tns';
import createSpy = jasmine.createSpy;

describe('LoginPage component class', function () {
    beforeEach(nsTestBedBeforeEach([], [], [AppModule]));
    afterEach(nsTestBedAfterEach());

    describe('onSubmit method', () => {
        it('should navigate only if login succeeds', function () {
            nsTestBedRender(LoginPageComponent).then((fixture: ComponentFixture<LoginPageComponent>) => {
                const router: RouterExtensions = fixture.componentInstance['routerExtensions'];
                router.navigate = createSpy('navigate');

                fixture.componentInstance.onSubmit(false);
                expect(router.navigate).not.toHaveBeenCalled();

                fixture.componentInstance.onSubmit(true);
                expect(router.navigate).toHaveBeenCalled();
            });
        });

        it('should only warn if login fails', function () {
            nsTestBedRender(LoginPageComponent).then((fixture: ComponentFixture<LoginPageComponent>) => {
                const service: IFeedbackService = fixture.componentInstance['feedbackService'];
                service.notifyWarning = createSpy('notifyWarning');

                fixture.componentInstance.onSubmit(true);
                expect(service.notifyWarning).not.toHaveBeenCalled();

                fixture.componentInstance.onSubmit(false);
                expect(service.notifyWarning).toHaveBeenCalled();
            });
        });
    });
});
