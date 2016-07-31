import { FORM_DIRECTIVES } from '@angular/forms';
import { ViewEncapsulation, Component } from '@angular/core';

import {
    GriddleConstants,
    GriddleService,
    PcDiagnostics,
    RequestMethod,
    UserService
} from "../shared";

@Component({
    selector: '.pc-signup',
    template: require('./sign-up.html'),
    styles: [require('./sign-up.scss')],
    directives: [FORM_DIRECTIVES],
    encapsulation: ViewEncapsulation.None
})
export class SignupComponent {

    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;

    /**
     * Creates an instance of the SignupComponent with the injected
     * UserService.
     *
     * @param {UserService} userService the injected UserService
     */
    constructor(public userService: UserService, private _griddleService: GriddleService) {
    }

    submit() {
        const createUserUrl = GriddleConstants.ApiUrls.Post.CreateUser;
        const body = <any> {
            "FirstName": this.firstName,
            "LastName": this.lastName,
            "LoginInfo": {
                "Email": this.email,
                "Password": this.password
            }
        };
        this._griddleService.apiCall(RequestMethod.Post, createUserUrl, null, body)
            .subscribe(() => {
                PcDiagnostics.Log(
                    PcDiagnostics.LogType.Info,
                    "SignupComponent",
                    "User created successfully",
                    [this.firstName, this.lastName, this.email, this.password, this.confirmPassword]
                );
            });
    }
}
