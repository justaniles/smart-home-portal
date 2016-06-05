import { DeviceDefinition } from "../device-definition";

interface BaseDevice {
    id: string;
    name: string;
    description: string;
}

/**
 * The schema of a device received from the server
 */
export interface DeviceFromServer extends BaseDevice {
    homeId: string;
    deviceDefinitionId: string;
}

/**
 * The interface of a device used throughout the application
 */
export interface Device extends BaseDevice {
    deviceDefinition: DeviceDefinition;
}

