import { Component, ViewEncapsulation } from "@angular/core";
import { Routes, Router } from "@angular/router";

import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import {
    NavbarComponent,
    DevicesService,
    DeviceDefinitionService,
    GriddleService
} from "./shared";

/*
 * Top Level Application Component
 */
@Component({
    selector: "app",
    providers: [
        DevicesService,
        DeviceDefinitionService,
        GriddleService
    ],
    directives: <any>[NavbarComponent],
    encapsulation: ViewEncapsulation.None,
    styles: [
        require("./app.scss")
    ],
    template: require("./app.html")
})
@Routes([
    {
        path: '/',
        component: HomeComponent
    },
    {
        path: '/home',
        component: HomeComponent
    },
    {
        path: "/login",
        component: LoginComponent
    }
])
export class AppComponent {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }
}
