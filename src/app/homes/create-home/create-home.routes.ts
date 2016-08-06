import { RouterConfig } from "@angular/router";
import { CreateHomeComponent } from "./create-home.component";

export const CreateHomeRoutes: RouterConfig = [
    {
        path: "homes/create",
        component: CreateHomeComponent
    }
];
