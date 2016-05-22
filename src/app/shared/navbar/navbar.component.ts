import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'pc-navbar',
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
