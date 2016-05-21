export * from './app.component';

import { UserService } from "./shared";

// Application wide providers
export const APP_PROVIDERS = [
    UserService
];
