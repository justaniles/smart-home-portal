import { FORM_DIRECTIVES } from "@angular/forms";
import { ViewEncapsulation, Component } from "@angular/core";
import { Router } from "@angular/router";

import { HomeService } from "../../homes";
import {
    GriddleConstants,
    GriddleService,
    RequestMethod
} from "../../shared/griddle"

@Component({
    selector: '.pc-account-lifx',
    template: require('./lifx.html'),
    styles: [require('./lifx.scss')],
    directives: [FORM_DIRECTIVES],
    encapsulation: ViewEncapsulation.None
})
export class LifxComponent {

    appKey: string;

    constructor(private griddleService: GriddleService, private _homeService: HomeService, private router: Router) {
    }

    submit() {
        const addLifxAccountUrl = GriddleConstants.ApiUrls.Put.AddLifxAccount
            .format({
                home: this._homeService.currentHome.id
            });
        const body = <any> {
            "AppKey": this.appKey
        };
        this.griddleService.apiCall(RequestMethod.Put, addLifxAccountUrl, null, body)
            .subscribe(() => {
                this.router.navigate(["/homes"]);
            });
    }
}
