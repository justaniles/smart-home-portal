import { Component, OnInit } from '@angular/core';

import {
    BaseField,
    FormData,
    FormComponent,
    FormOptions,
    InputField
} from "../shared/components/forms";
import { GriddleConstants, GriddleService, RequestMethod } from "../shared/griddle";
import { PcDiagnostics } from "../shared/pc-portal";

@Component({
    selector: 'pc-signup',
    directives: [FormComponent],
    styles: [require('./sign-up.scss')],
    template:
    `<pc-form class="pc-signup-container" 
        [fields]="formFields" 
        [options]="formOptions" 
        (submitRequest)="submitForm($event)">
    </pc-form>`
})
export class SignupComponent implements OnInit {

    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;

    formFields: BaseField[];
    formOptions: FormOptions;

    /**
     * Creates an instance of the SignupComponent with the injected
     * UserService.
     *
     * @param {UserService} userService the injected UserService
     */
    constructor(private griddleService: GriddleService) {
    }

    ngOnInit() {
        // Setup the form for this page
        this.formFields = [
            new InputField({
                name: "firstName",
                type: "text",
                placeholder: "First name"
            }),
            new InputField({
                name: "lastName",
                type: "text",
                placeholder: "Last name"
            }),
            new InputField({
                name: "email",
                type: "email",
                placeholder: "Email"
            }),
            new InputField({
                name: "password",
                type: "password",
                placeholder: "Password"
            }),
            new InputField({
                name: "confirmPassword",
                type: "password",
                placeholder: "Confirm password"
            })
        ];

        this.formOptions = new FormOptions({
            formTitle: "Signup for Pancake"
        });
    }

    submitForm(formData: FormData) {
        const createUserUrl = GriddleConstants.ApiUrls.Post.CreateUser;
        const body = <any> {
            "FirstName": formData["firstName"].value,
            "LastName": formData["lastName"].value,
            "LoginInfo": {
                "Email": formData["email"].value,
                "Password": formData["password"].value
            }
        };
        this.griddleService.apiCall(RequestMethod.Post, createUserUrl, null, body)
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
