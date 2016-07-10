import { DeviceService, GriddleService } from "./shared";

export * from './app.component';

// Application wide providers
export const APP_PROVIDERS = [
    DeviceService,
    GriddleService
];
