import { enableProdMode } from "@angular/core";
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from "@angular/router"

import { DIRECTIVES, PIPES, PROVIDERS } from './platform/browser';
import { AppComponent, APP_PROVIDERS } from './app';

/*
 * Bootstrap our Angular app with a top level component `AppComponent` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(): Promise<any> {

    if ('production' === ENV) {
        enableProdMode();
    }

    return bootstrap(AppComponent, [
        ROUTER_PROVIDERS,
        PIPES,
        DIRECTIVES,
        PROVIDERS,
        APP_PROVIDERS
    ]).catch(err => console.error(err));

}

document.addEventListener('DOMContentLoaded', () => main());
