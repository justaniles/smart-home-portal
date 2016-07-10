import { provideRouter, RouterConfig }  from '@angular/router';
import { HomeRoutes } from "./home";
import { LoginRoutes } from "./login";

export const routes: RouterConfig = [
    ...HomeRoutes,
    ...LoginRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
];
