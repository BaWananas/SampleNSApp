import 'reflect-metadata';
import {AppModule} from '@src/app/root/app.module';
import {Feedback} from 'nativescript-feedback';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {TestBed} from '@angular/core/testing';

describe('Feedback service', () => {
    let service: FeedbackService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ]
        });
        service = TestBed.get(FeedbackService);
    });

    it('should create a feedback', function () {
        expect(FeedbackService['createFeedback']()).toBeDefined();
    });

    it('should store a feedback', function () {
        const feedback = new Feedback();
        service['storeFeedback'](feedback);
        expect(service['feedbackList'].length).toBeGreaterThan(0);
    });

    it('should store only one feedback', function () {
        const feedback = new Feedback();
        service['storeFeedback'](feedback);
        service['storeFeedback'](feedback);
        expect(service['feedbackList'].length).toBe(1);
    });

    it('should remove a stored feedback', function () {
        const feedback = new Feedback();
        const feedbackRef = service['storeFeedback'](feedback);
        service['removeFeedback'](feedbackRef);
        expect(service['feedbackList'].length).toBe(0);
    });

    it('should return valid stored feedback index (0)', function () {
        const feedback = new Feedback();
        const feedbackRef = service['storeFeedback'](feedback);
        expect(service['getFeedbackIndex'](feedbackRef)).toBe(0);
    });

    it('should return feedback reference for each notifyX method, display only one feedback at the same time.', function () {
        const refs: string[] = [];
        refs.push(service.notifySuccess(''));
        refs.push(service.notifyInfo(''));
        refs.push(service.notifyWarning(''));
        refs.push(service.notifyError(new Error('')));
        refs.push(service.notifyCustom({}));
        expect(refs.length).toBe(5);
        expect(service['feedbackList'].length).toBe(1);
    });

    it('should hide feedback', function () {
        const feedback = new Feedback();
        const feedbackRef = service['storeFeedback'](feedback);
        service.hideFeedbackNotification(feedbackRef);
        expect(service['feedbackList'].length).toBe(0);
    });
});
