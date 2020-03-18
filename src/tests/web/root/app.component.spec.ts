import {TestBed} from '@angular/core/testing';
import {AppModule} from '@src/app/root/app.module';
import {AppComponent} from '@src/app/root/components/app/app.component';
import createSpy = jasmine.createSpy;

describe('App root component', () => {
    let component: AppComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AppComponent
            ],
            imports: [
                AppModule
            ]
        });
        component = TestBed.get(AppComponent);
    });

    describe('logOut method', () => {
        it('should redirect to loginPage', function () {
            component['router'].navigate = createSpy('navigate');
            component.logout();
            expect(component['router'].navigate).toHaveBeenCalled();
        });

        it('should call signOut method', function () {
            component['authenticationService'].signOut = createSpy('signOut');
            component.logout();
            expect(component['authenticationService'].signOut).toHaveBeenCalled();
        });
    });

    describe('Login page redirection', () => {
        it('should nav to login page', function () {
            component['router'].navigate = createSpy('navigate');
            component['redirectToLoginPage']();
            expect(component['router'].navigate).toHaveBeenCalled();
        });
    });

    describe('Home page redirection', () => {
        it('should nav to home page', function () {
            component['router'].navigate = createSpy('navigate');
            component['redirectToHomePage']();
            expect(component['router'].navigate).toHaveBeenCalled();
        });
    });

});
