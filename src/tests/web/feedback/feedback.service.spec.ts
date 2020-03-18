import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {TestBed} from '@angular/core/testing';
import {AppModule} from '@src/app/root/app.module';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {ClipboardService} from 'ngx-clipboard';
import createSpy = jasmine.createSpy;

describe('Feedback service', () => {
    let service: FeedbackService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MatSnackBar,
                ClipboardService
            ],
            imports: [
                AppModule
            ]
        });
        service = TestBed.get(FeedbackService);
    });

    it('should call MatSnackBar.open in order to notify', function () {
        service['snackBar'].open = createSpy('open');
        service.notifyWarning('');
        service.notifySuccess('');
        service.notifyInfo('');
        service.notifyError(undefined);
        service.notifyCustom(new MatSnackBarConfig());
        expect(service['snackBar'].open).toHaveBeenCalledTimes(4);
    });

    it('should call MatSnackBar.dismiss to dismiss feedbacks', function () {
        service['snackBar'].dismiss = createSpy('dismiss');
        service.hideFeedbackNotification('');
        expect(service['snackBar'].dismiss).toHaveBeenCalled();
    });
});
