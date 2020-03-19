import 'reflect-metadata';
import { nsTestBedBeforeEach, nsTestBedAfterEach, nsTestBedRender } from 'nativescript-angular/testing';
import {AppModule} from '@src/app/root/app.module';
import {MobileAnimationService} from '@arhs/ui';
import { RouterExtensions } from '@nativescript/angular';
import {RouterTestingModule} from '@angular/router/testing';
import {TitleNavBarComponent} from '@src/app/shared/components/navigation/title-nav-bar/title-nav-bar.component.tns';
import createSpy = jasmine.createSpy;

describe('TitleNavBar component', () => {
    beforeEach(nsTestBedBeforeEach([], [MobileAnimationService, RouterExtensions, RouterTestingModule], [AppModule]));
    afterEach(nsTestBedAfterEach(false));

    it('should go backward', function () {
        nsTestBedRender(TitleNavBarComponent).then(value => {
            value.componentInstance['router'].back = createSpy('back');
            value.componentInstance.goBack();
            expect(value.componentInstance['router'].back).toHaveBeenCalled();
        });
    });

    it('should nav to home', function () {
        nsTestBedRender(TitleNavBarComponent).then(value => {
            value.componentInstance['router'].navigate = createSpy('navigate');
            value.componentInstance.goHome();
            expect(value.componentInstance['router'].navigate).toHaveBeenCalled();
        });
    });

    it('should call animate on MobileAnimation', function () {
        nsTestBedRender(TitleNavBarComponent).then(value => {
            value.componentInstance['animationService'].animate = createSpy('animate');
            value.componentInstance.animateButtons(undefined);
            expect(value.componentInstance['animationService'].animate).toHaveBeenCalled();
        });
    });
});
