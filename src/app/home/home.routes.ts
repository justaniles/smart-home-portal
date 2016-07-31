import { RouterConfig } from "@angular/router";
import { AuthGuard } from "../shared";
import { HomeComponent } from "./home.component";

export const HomeRoutes: RouterConfig = [
    {
        path: "",
        component: HomeComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: "home",
        redirectTo: "",
        pathMatch: "full"
    }
];
