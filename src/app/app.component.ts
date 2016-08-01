import { Component, ViewEncapsulation } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";

import {
    NavbarComponent,
} from "./shared";

/*
 * Top Level Application Component
 */
@Component({
    selector: "app",
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
