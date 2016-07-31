import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthStorage } from "./authstorage";

export * from "./auth.guard";
export * from "./auth.service";

export const AUTH_PROVIDERS = [
    AuthGuard,
    AuthService,
    AuthStorage
];
