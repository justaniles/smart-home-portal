import { Component, ViewEncapsulation } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";

import {
    DeviceService,
    GriddleService,
    NavbarComponent,
    UserService
} from "./shared";

/*
 * Top Level Application Component
 */
@Component({
    selector: "app",
    providers: [
        DeviceService,
        GriddleService,
        UserService
    ],
    directives: [
        NavbarComponent,
        ROUTER_DIRECTIVES
    ],
    encapsulation: ViewEncapsulation.None,
    styles: [require("./app.scss")],
    template: require("./app.html")
})
export class AppComponent {
}
