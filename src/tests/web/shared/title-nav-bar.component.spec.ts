import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppModule} from '@src/app/root/app.module';
import {TitleNavBarComponent} from '@src/app/shared/components/navigation/title-nav-bar/title-nav-bar.component';
import createSpy = jasmine.createSpy;

describe('TitleNavBar component', function () {
    let component: TitleNavBarComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TitleNavBarComponent,
                RouterTestingModule
            ],
            imports: [
                AppModule
            ]
        });
        component = TestBed.get(TitleNavBarComponent);
    });

    it('should go backward', function () {
        component['router'].navigate = createSpy('navigate');
        component.goBack();
        expect(component['router'].navigate).toHaveBeenCalled();
    });

    it('should nav to home', function () {
        component['router'].navigate = createSpy('navigate');
        component.goHome();
        expect(component['router'].navigate).toHaveBeenCalled();
    });
});
