import {FormBuilder, Validators} from '@angular/forms';
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';
import {EventEmitter, Output} from '@angular/core';

/**
 * Shared part of the LoginForm component.
 */
export abstract class LoginFormCommon {

    /**
     * Event triggered when form submitted.
     *
     * Sen boolean value: true if authentication succeeds, false if not.
     */
    @Output() formSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * The login form model.
     */
    public loginForm = this.formBuilder.group({
        id: [''],
        password: [''],
        userId: ['0', Validators.required]
    });

    /**
     * Constructor.
     * @param formBuilder FormBuilder library service.
     * @param authenticationService refers to {@link IAuthenticationService}
     */
    protected constructor(protected formBuilder: FormBuilder, protected authenticationService: IAuthenticationService) {
    }

    /**
     * Submit the form and do the authentication verification.
     */
    public submitForm(): void {
        this.formSubmit.emit(this.authenticationService.signIn(this.loginForm.value.userId));
    }
}
