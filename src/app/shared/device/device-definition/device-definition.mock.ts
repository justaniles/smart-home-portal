import { DeviceDefinition } from "./device-definition.model";

const MOCK_OBJECTS: DeviceDefinition[] = [
    {
        id: "0",
        name: "Color Bulb",
        manufacturer: "LIFX",
        type: "Lightbulb",
        supportedFunctions: [ "toggleOnOff", "turnOn", "turnOff" ],
        primaryFunction: "toggleOnOff"
    }
];

export function generateMockDeviceDefinitions() {
    return MOCK_OBJECTS;
}
