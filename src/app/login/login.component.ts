import { FORM_DIRECTIVES } from '@angular/forms';
import { ViewEncapsulation, Component } from '@angular/core';

import { AuthService } from "../shared";
import { GriddleConstants, GriddleService, RequestMethod } from "../shared/griddle";

import GriddleResponses = GriddleConstants.ResponseObjects;

@Component({
    selector: '.pc-login',
    template: require('./login.html'),
    styles: [require('./login.scss')],
    directives: [FORM_DIRECTIVES],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

    email: string;
    password: string;

    constructor(private authService: AuthService, private griddleService: GriddleService) {
        this.authService.clearAuthToken();
    }

    login() {
        const loginUrl = GriddleConstants.ApiUrls.Post.LoginUser;
        const body = {
            "Email": this.email,
            "Password": this.password
        };
        this.griddleService.apiCall(RequestMethod.Post, loginUrl, null, body)
            .map((responseObject: any) => {
                // Just need to cast the responseObject for typing purposes
                return <GriddleResponses.LoginUserResponse>responseObject;
            })
            .subscribe((authInformation) => {
                const token = authInformation.Token;
                this.authService.storeAuthToken(this.email, token);
                console.log("Login successful!");
            });
    }
}
