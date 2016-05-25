/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from "@angular/core";
import { Routes, Router } from "@angular/router";

import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import { NavbarComponent } from "./shared";

/*
 * AppComponent Component
 * Top Level Component
 */
@Component({
    selector: "app",
    providers: [], // Application-wide providers should be placed in app/index.ts
    directives: <any>[NavbarComponent],
    encapsulation: ViewEncapsulation.None,
    styles: [
        require("./app.scss")
    ],
    template: require("./app.html")
})
// TODO: Remove cast to Route[]
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

    constructor(private router: Router) {}

    ngOnInit() {
    }
}
