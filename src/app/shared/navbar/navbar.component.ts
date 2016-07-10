import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";

@Component({
    selector: 'pc-navbar',
    directives: [ROUTER_DIRECTIVES],
    template: require("./navbar.html"),
    styles: [require("./navbar.scss")],
    encapsulation: ViewEncapsulation.None
})
/**
 * This class represents the navigation bar component.
 */
export class NavbarComponent {

    constructor() {
    }
}
