import { CreateHomeRoutes } from "./create-home";
import { ManageHomesRoutes } from "./manage-homes";

export * from "./home.model";
export * from "./home.service";

export const HomesRoutes = [
    ...CreateHomeRoutes,
    ...ManageHomesRoutes
];
