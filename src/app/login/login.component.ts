import { FORM_DIRECTIVES } from '@angular/forms';
import { ViewEncapsulation, Component } from '@angular/core';

import { AuthService } from "../shared/index";

@Component({
    selector: '.pc-login',
    template: require('./login.html'),
    styles: [require('./login.scss')],
    directives: [FORM_DIRECTIVES],
    encapsulation: ViewEncapsulation.None
})
/**
 * This class represents the lazy loaded SignupComponent.
 */
export class LoginComponent {

    email: string;
    password: string;

    constructor(public _authService: AuthService) {
    }

    login() {
        this._authService.login(this.email, this.password)
            .then(() => {
                console.log("Login successful!");
            });
    }
}
