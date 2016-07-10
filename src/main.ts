import { enableProdMode } from "@angular/core";
import { bootstrap } from "@angular/platform-browser-dynamic";

import { AppComponent, APP_ROUTER_PROVIDERS } from "./app";
import { PROVIDERS } from "./global";

/*
 * Bootstrap our Angular app with a top level component `AppComponent` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(): Promise<any> {

    if ('production' === ENV) {
        enableProdMode();
    }

    return bootstrap(AppComponent, [
        APP_ROUTER_PROVIDERS,
        PROVIDERS
    ]).catch(err => console.error(err));

}

document.addEventListener('DOMContentLoaded', () => main());
