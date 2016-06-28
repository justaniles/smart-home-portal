import { DevicesService, DeviceDefinitionService, GriddleService } from "./shared";

export * from './app.component';

// Application wide providers
export const APP_PROVIDERS = [
    DevicesService,
    DeviceDefinitionService,
    GriddleService
];
