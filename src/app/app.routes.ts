import { provideRouter, RouterConfig }  from '@angular/router';
import { HomeRoutes } from "./home";
import { LoginRoutes } from "./login";
import { SignupRoutes } from "./sign-up";

export const routes: RouterConfig = [
    ...HomeRoutes,
    ...LoginRoutes,
    ...SignupRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
];
