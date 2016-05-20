import {FORM_DIRECTIVES} from '@angular/common';
import {ViewEncapsulation, Component} from '@angular/core';

import {UserService} from "../shared/index";

@Component({
    selector: '.pc-login',
    templateUrl: 'app/+login/login.html',
    styleUrls: ['app/+login/login.scss'],
    directives: [FORM_DIRECTIVES],
    encapsulation: ViewEncapsulation.None
})
/**
 * This class represents the lazy loaded LoginComponent.
 */
export class LoginComponent {

    email: string;
    password: string;

    /**
     * Creates an instance of the LoginComponent with the injected
     * UserService.
     *
     * @param {UserService} userService the injected UserService
     */
    constructor(public userService: UserService) {
    }

    login() {
        this.userService.loginUser(this.email, this.password);
    }
}
