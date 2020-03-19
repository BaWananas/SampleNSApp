import 'reflect-metadata';
import {nsTestBedAfterEach, nsTestBedBeforeEach, nsTestBedRender} from 'nativescript-angular/testing';
import {AppModule} from '@src/app/root/app.module';
import {SideDrawerBarComponent} from '@src/app/shared/components/navigation/side-drawer-bar/side-drawer-bar.component.tns';

describe('SideDrawerBar component', () => {
    beforeEach(nsTestBedBeforeEach([], [], [AppModule]));
    afterEach(nsTestBedAfterEach(false));

    it('should toggle sideDrawer', function () {
        nsTestBedRender(SideDrawerBarComponent).then(value => {
            expect(value.componentInstance['sideDrawer'].sideDrawer.getIsOpen()).toBe(false);
            value.componentInstance.toggleSideDrawer();
            expect(value.componentInstance['sideDrawer'].sideDrawer.getIsOpen()).toBe(true);
            value.componentInstance.toggleSideDrawer();
            expect(value.componentInstance['sideDrawer'].sideDrawer.getIsOpen()).toBe(false);
        });
    });
});
