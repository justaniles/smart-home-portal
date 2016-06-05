export interface DeviceDefinition {
    id: string;
    name: string;
    manufacturer: string;
    type: string;
    supportedFunctions: string[];
    primaryFunction: string;
}
