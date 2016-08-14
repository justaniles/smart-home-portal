import { Component } from "@angular/core";
import { FORM_DIRECTIVES } from "@angular/forms";
import { Router } from "@angular/router";

import {
    GriddleConstants,
    GriddleService,
    RequestMethod
} from "../../shared/griddle";

@Component({
    selector: 'create-home',
    template: require('./create-home.html'),
    styles: [require('./create-home.scss')],
    directives: [FORM_DIRECTIVES]
})
export class CreateHomeComponent {

    homeName: string;

    constructor(private griddleService: GriddleService, private router: Router) {
    }

    submit() {
        const createHomeUrl = GriddleConstants.ApiUrls.Post.CreateHome;
        const body = <any> {
            "Name": this.homeName
        };
        this.griddleService.apiCall(RequestMethod.Post, createHomeUrl, null, body)
            .subscribe(() => {
                this.router.navigate(["/homes"]);
            });
    }
}
