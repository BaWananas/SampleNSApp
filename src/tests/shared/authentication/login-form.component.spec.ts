import {LoginFormComponent} from '@src/app/authentication/components/login/login-form/login-form.component';
import {TestBed} from '@angular/core/testing';
import {AppModule} from '@src/app/root/app.module';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';

describe('LoginForm component class', () => {
    let component: LoginFormComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoginFormComponent,
                FormBuilder,
                AuthenticationService
            ],
            imports: [
                AppModule
            ]
        });
        component = TestBed.get(LoginFormComponent);
    });

    it('should emit event when submit form', (done) => {
        component.formSubmit.subscribe(() => {
            done();
        }, () => {
            done.fail();
        });
        component.submitForm();
    });
});
