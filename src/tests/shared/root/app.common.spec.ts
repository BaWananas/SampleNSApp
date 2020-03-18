import {AppComponent} from '@src/app/root/components/app/app.component';
import {TestBed} from '@angular/core/testing';
import {AppModule} from '@src/app/root/app.module';
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

    describe('ngOnInit method', () => {
        it('should load data', function () {
            component['sessionService'].loadPersistentData = createSpy('loadPersistentData');
            component.ngOnInit();
            expect(component['sessionService'].loadPersistentData).toHaveBeenCalled();
        });
    });

    describe('isAuthenticated method', () => {
        it('should return true only if authenticated', function () {
            component['authenticationService'].signOut();
            expect(component.isAuthenticated()).toBe(false);
            component['authenticationService'].signIn(0);
            expect(component.isAuthenticated()).toBe(true);
        });
    });
});
