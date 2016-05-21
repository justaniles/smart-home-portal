/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

import { Home } from './home';
import { LoginComponent } from "./login";

/*
 * AppComponent Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    providers: [], // Application-wide providers should be placed in app/index.ts
    directives: [ROUTER_DIRECTIVES],
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./app.css')
    ],
    template: require("./app.html")
})
// TODO: Remove cast to Route[]
@Routes(<any>[
    {
        path: '/',
        component: Home
    },
    {
        path: "/login",
        component: LoginComponent
    }
])
export class AppComponent {

    constructor(private router: Router) {}

    ngOnInit() {
        console.log("Loaded app");
    }
}
