import 'reflect-metadata';
import {nsTestBedAfterEach, nsTestBedBeforeEach, nsTestBedRender} from 'nativescript-angular/testing';
import {AppModule} from '@src/app/root/app.module';
import {AppComponent} from '@src/app/root/components/app/app.component.tns';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service.tns';
import {RouterTestingModule} from '@angular/router/testing';
import createSpy = jasmine.createSpy;

describe('App root component', () => {
    beforeEach(nsTestBedBeforeEach([], [], [AppModule, RouterTestingModule]));
    afterEach(nsTestBedAfterEach(false));

    it('should init the menu', function () {
        nsTestBedRender(AppComponent).then(fixture => {
            fixture.componentInstance.ngOnInit();
            expect((<SessionService>fixture.componentInstance['sessionService']).sideDrawer).toBeDefined();
        });
    });

    describe('logOut method', () => {
        it('should redirect to loginPage', function () {
            nsTestBedRender(AppComponent).then(fixture => {
                fixture.componentInstance['routerExtensions'].navigate = createSpy('navigate');
                fixture.componentInstance.logout();
                expect(fixture.componentInstance['routerExtensions'].navigate).toHaveBeenCalled();
            });
        });

        it('should close menu', function () {
            nsTestBedRender(AppComponent).then(fixture => {
                fixture.componentInstance.logout();
                expect((<SessionService>fixture.componentInstance['sessionService']).sideDrawer.sideDrawer.getIsOpen()).toBe(false);
            });
        });

        it('should call signOut method', function () {
            nsTestBedRender(AppComponent).then(fixture => {
                fixture.componentInstance['authenticationService'].signOut = createSpy('signOut');
                fixture.componentInstance.logout();
                expect(fixture.componentInstance['authenticationService'].signOut).toHaveBeenCalled();
            });
        });
    });

    describe('navToSubscriptions method', () => {
        it('should redirect to subscriptions page', function () {
            nsTestBedRender(AppComponent).then(fixture => {
                fixture.componentInstance['routerExtensions'].navigate = createSpy('navigate');
                fixture.componentInstance.navToSubscriptions();
                expect(fixture.componentInstance['routerExtensions'].navigate).toHaveBeenCalled();
            });
        });

        it('should close menu', function () {
            nsTestBedRender(AppComponent).then(fixture => {
                fixture.componentInstance.navToSubscriptions();
                expect((<SessionService>fixture.componentInstance['sessionService']).sideDrawer.sideDrawer.getIsOpen()).toBe(false);
            });
        });
    });

    describe('navToLoginPage method', () => {
        it('should redirect to login page', function () {
            nsTestBedRender(AppComponent).then(fixture => {
                fixture.componentInstance['routerExtensions'].navigate = createSpy('navigate');
                fixture.componentInstance.navToLogin();
                expect(fixture.componentInstance['routerExtensions'].navigate).toHaveBeenCalled();
            });
        });

        it('should close menu', function () {
            nsTestBedRender(AppComponent).then(fixture => {
                fixture.componentInstance.navToLogin();
                expect((<SessionService>fixture.componentInstance['sessionService']).sideDrawer.sideDrawer.getIsOpen()).toBe(false);
            });
        });
    });

    describe('navToHome method', () => {
        it('should redirect to home page', function () {
            nsTestBedRender(AppComponent).then(fixture => {
                fixture.componentInstance['routerExtensions'].navigate = createSpy('navigate');
                fixture.componentInstance.navToHome();
                expect(fixture.componentInstance['routerExtensions'].navigate).toHaveBeenCalled();
            });
        });

        it('should close menu', function () {
            nsTestBedRender(AppComponent).then(fixture => {
                fixture.componentInstance.navToHome();
                expect((<SessionService>fixture.componentInstance['sessionService']).sideDrawer.sideDrawer.getIsOpen()).toBe(false);
            });
        });
    });

    describe('animate buttons method', () => {
        it('should call animationService.animate method', function () {
            nsTestBedRender(AppComponent).then(fixture => {
                fixture.componentInstance['animationService'].animate = createSpy('animate');
                fixture.componentInstance.animateButtons(null);
                expect(fixture.componentInstance['animationService'].animate).toHaveBeenCalled();
            });
        });
    });
});
