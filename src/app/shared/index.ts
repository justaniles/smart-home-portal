import { AUTH_PROVIDERS } from "./auth";
import { GriddleService } from "./griddle";
import { UserService } from "./user";

/**
 * This barrel file provides the exports for the shared
 * resources (services, components).
 */
export * from "./auth";
export * from "./device";
export * from "./griddle";
export * from "./navbar";
export * from "./pc-portal";
export * from "./user";

export const SHARED_PROVIDERS = [
    ...AUTH_PROVIDERS,
    GriddleService,
    UserService
];

