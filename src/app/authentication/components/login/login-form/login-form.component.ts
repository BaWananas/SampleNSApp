import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {faCheck, faUserSecret} from '@fortawesome/free-solid-svg-icons';
import {LoginFormCommon} from '@src/app/authentication/components/login/login-form/login-form-common';

/**
 * LoginForm component for web platform.
 */
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent extends LoginFormCommon implements OnInit {

    /**
     * Is the password was currently hidden ?
     */
    public passwordHidden = true;
    /**
     * Login icon.
     */
    public loginIcon = faCheck;
    /**
     * User account icon.
     */
    public userIcon = faUserSecret;

    /**
     * Constructor.
     *
     * Refers to {@link LoginFormCommon}
     * @param form
     * @param authenticationService
     */
    constructor(private form: FormBuilder, authenticationService: AuthenticationService) {
        super(form, authenticationService);
    }

    /**
     * Refers to {@link OnInit}
     */
    ngOnInit() {
    }

}
