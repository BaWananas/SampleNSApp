import {GroupCreationFormComponent} from '@src/app/subscription/components/forms/group-creation-form/group-creation-form.component';
import {TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {AppModule} from '@src/app/root/app.module';

describe('GroupCreationForm component', () => {
    let component: GroupCreationFormComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GroupCreationFormComponent,
                FormBuilder
            ],
            imports: [
                AppModule
            ]
        });
        component = TestBed.get(GroupCreationFormComponent);
    });

    it('should emit event when submitting', done => {
        component.groupCreationForm.controls['name'].setValue('test');
        component.groupCreationForm.controls['description'].setValue('test');
        component.groupCreationForm.controls['associationId'].setValue(0);
        component.createEvent.subscribe(() => {
            done();
            expect(true).toBe(true);
        });
        component.submitForm();
    });
});
