import { AUTH_PROVIDERS } from "./auth";
import { DeviceService } from "./device";
import { GriddleService } from "./griddle";

/**
 * This barrel file provides the exports for the shared
 * resources (services, components).
 */
export * from "./auth";
export * from "./device";
export * from "./griddle";
export * from "./navbar";
export * from "./pc-portal";

export const SHARED_PROVIDERS = [
    ...AUTH_PROVIDERS,
    DeviceService,
    GriddleService
];

