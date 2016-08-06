import { RouterConfig } from "@angular/router";
import { CreateHomeRoutes } from "./create";
import { ManageHomesComponent } from "./manage-homes.component";

export const ManageHomesRoutes: RouterConfig = [
    {
        path: "homes",
        component: ManageHomesComponent
    },
    ...CreateHomeRoutes
];
