import { RouterConfig } from "@angular/router";
import { AuthGuard } from "../shared";
import { HomeViewComponent } from "./home-view.component";

export const HomeRoutes: RouterConfig = [
    {
        path: "",
        component: HomeViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "home",
        redirectTo: "",
        pathMatch: "full"
    }
];
