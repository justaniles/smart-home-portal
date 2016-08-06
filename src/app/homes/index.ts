import { CreateHomeRoutes } from "./create-home";
import { ManageHomesRoutes } from "./manage-homes";

export * from "./home.model";

export const HomesRoutes = [
    ...CreateHomeRoutes,
    ...ManageHomesRoutes
];
