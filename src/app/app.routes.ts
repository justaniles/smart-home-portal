import { provideRouter, RouterConfig }  from '@angular/router';
import { AccountsRoutes } from "./accounts";
import { HomeRoutes } from "./home";
import { LoginRoutes } from "./login";
import { HomesRoutes } from "./homes";
import { SignupRoutes } from "./sign-up";

export const routes: RouterConfig = [
    ...AccountsRoutes,
    ...HomeRoutes,
    ...HomesRoutes,
    ...LoginRoutes,
    ...SignupRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
];
