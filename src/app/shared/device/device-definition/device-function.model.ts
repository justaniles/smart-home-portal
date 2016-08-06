import { PcDiagnostics, PcUtils } from "../../pc-portal";

export class DeviceFunction {
    private _name: string;
    private _argumentType: string;

    constructor(name: string, argumentType: string) {
        this._name = name;
        this._argumentType = argumentType;
    }

    static createFromObject(object: any): DeviceFunction {
        if (!object) {
            PcDiagnostics.Log(
                PcDiagnostics.LogType.Error,
                "DeviceFunction.createFromObject",
                "Cannot create-home a DeviceFunction from an empty object."
            );
            return null;
        }

        const name = PcUtils.getValueOrDefault(object.Name, "");
        const argumentType = PcUtils.getValueOrDefault(object.ArgumentType, "");

        return new DeviceFunction(name, argumentType);
    }

    /**
     * Gets the name of the function
     * @returns {string}
     */
    get name(): string {
        return this._name;
    }

    /**
     * Gets the argument type that the function takes
     * @returns {string}
     */
    get argumentType(): string {
        return this._argumentType;
    }
}
