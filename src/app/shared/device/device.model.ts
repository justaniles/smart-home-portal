import { DeviceDefinition, DeviceFunction } from "./device-definition";
import { PcDiagnostics, PcUtils } from "../pc-portal";

class BaseDevice {
    protected _description: string;
    protected _deviceDefinition: DeviceDefinition;
    protected _homeId: string;
    protected _id: string;
    protected _name: string;

    /**
     * Creates a new BaseDevice
     * @param id
     * @param name
     * @param description
     * @param homeId
     * @param deviceDefinition
     */
    constructor(id: string, name: string, description: string, homeId: string, deviceDefinition: DeviceDefinition) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._homeId = homeId;
        this._deviceDefinition = deviceDefinition;
    }

    /**
     * Gets the device description
     * @returns {string}
     */
    get description(): string {
        return this._description;
    }

    /**
     * Gets the DeviceDefinition for this device
     * @returns {DeviceDefinition}
     */
    get deviceDefinition(): DeviceDefinition {
        return this._deviceDefinition;
    }

    /**
     * Gets the home id for this device
     * @returns {string}
     */
    get homeId(): string {
        return this._homeId;
    }

    /**
     * Gets the id of this device
     * @returns {string}
     */
    get id(): string {
        return this._id;
    }

    /**
     * Gets the name of this device
     * @returns {string}
     */
    get name(): string {
        return this._name;
    }
}

/**
 * The schema of a device used throughout the application
 */
export class Device extends BaseDevice {

    /**
     * Create a new Device
     * @param id
     * @param name
     * @param description
     * @param homeId
     * @param deviceDefinition
     */
    constructor(id: string, name: string, description: string, homeId: string, deviceDefinition: DeviceDefinition) {
        super(id, name, description, homeId, deviceDefinition);
    }

    /**
     * Attempts to create-home a device from the provided Javascript object, using default
     * values where possible.
     * @param object Object to parse and create-home a device from
     * @returns {Device} A new Device
     */
    static createFromObject(object: any): Device {
        if (!object) {
            PcDiagnostics.Log(
                PcDiagnostics.LogType.Error,
                "Device.createFromObject",
                "Cannot create-home a Device from an empty server object."
            );
            return null;
        }

        const id = PcUtils.getValueOrDefault(object.Id, "");
        const name = PcUtils.getValueOrDefault(object.Name, "");
        const description = PcUtils.getValueOrDefault(object.Description, "");
        const homeId = PcUtils.getValueOrDefault(object.Home, "");
        const deviceDefinition = DeviceDefinition.createFromObject(object.Definition);

        return new Device(id, name, description, homeId, deviceDefinition);
    }

    get functions(): DeviceFunction[] {
        return this._deviceDefinition.functions;
    }
    get primaryFunction(): DeviceFunction {
        return this._deviceDefinition.functions[0];
    }
}

