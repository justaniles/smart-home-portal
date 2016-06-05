export * from './app.component';

import { UserService, DeviceDefinitionService } from "./shared";

// Application wide providers
export const APP_PROVIDERS = [
    UserService,
    DeviceDefinitionService
];
