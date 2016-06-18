import { Component, ViewEncapsulation } from "@angular/core";
import { Routes, Router } from "@angular/router";

import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import { NavbarComponent, DevicesService, DeviceDefinitionService } from "./shared";
import 'rxjs/add/operator/map';

/*
 * Top Level Application Component
 */
@Component({
    selector: "app",
    providers: [DevicesService, DeviceDefinitionService],
    directives: <any>[NavbarComponent],
    encapsulation: ViewEncapsulation.None,
    styles: [
        require("./app.scss")
    ],
    template: require("./app.html")
})
// TODO: Remove cast to <any>
@Routes(<any>[
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
