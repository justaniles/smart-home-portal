import { DeviceFunction } from "./device-function.model";
import { PcDiagnostics, PcUtils } from "../../pc-portal";

export class DeviceDefinition {
    private _id: string;
    private _manufacturer: string;
    private _type: string;
    private _functions: DeviceFunction[];

    constructor(id: string, manufacturer: string, type: string, functions: DeviceFunction[]) {
        this._id = id;
        this._manufacturer = manufacturer;
        this._type = type;
        this._functions = functions;
    }

    static createFromObject(object: any): DeviceDefinition {
        if (!object) {
            PcDiagnostics.Log(
                PcDiagnostics.LogType.Error,
                "DeviceDefinition.createFromObject",
                "Cannot create a DeviceDefinition from an empty object."
            );
            return null;
        }

        const id = PcUtils.getValueOrDefault(object.Id, "");
        const manufacturer = PcUtils.getValueOrDefault(object.Manufacturer, "");
        const type = PcUtils.getValueOrDefault(object.Type, "");
        const functions: DeviceFunction[] = [];

        const rawFunctions = PcUtils.getValueOrDefault(object.Functions, []);
        for (let func of rawFunctions) {
            functions.push(DeviceFunction.createFromObject(func));
        }

        return new DeviceDefinition(id, manufacturer, type, functions);
    }

    get id(): string {
        return this._id;
    }

    get manufacturer(): string {
        return this._manufacturer;
    }

    get type(): string {
        return this._type;
    }

    get functions(): DeviceFunction[] {
        return this._functions;
    }
}
