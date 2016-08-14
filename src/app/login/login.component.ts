import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { ROUTER_DIRECTIVES } from "@angular/router";

import { AuthService } from "../shared";
import { GriddleConstants, GriddleService, RequestMethod } from "../shared/griddle";

import GriddleResponses = GriddleConstants.ResponseObjects;

@Component({
    selector: 'pc-login',
    template: require('./login.html'),
    styles: [require('./login.scss')],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
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
