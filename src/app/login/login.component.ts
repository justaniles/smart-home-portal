import { FORM_DIRECTIVES } from '@angular/forms';
import { ViewEncapsulation, Component } from '@angular/core';

import { AuthService, GriddleConstants, UserService } from "../shared";

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

    constructor(private authService: AuthService, private userService: UserService) {
        this.authService.clearAuthToken();
    }

    login() {
        this.userService.loginUser(this.email, this.password)
            .subscribe((authInformation: GriddleConstants.ResponseObjects.LoginUserResponse) => {
                const token = authInformation.Token;
                this.authService.storeAuthToken(this.email, token);
                console.log("Login successful!");
            });
    }
}
