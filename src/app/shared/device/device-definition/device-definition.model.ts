import { DeviceFunction } from "./device-function.model";

import PcDiagnostics = PcPortal.Diagnostics;
import PcUtils = PcPortal.Utils;

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

        const id = PcUtils.getValueOrDefault(object.id, "");
        const manufacturer = PcUtils.getValueOrDefault(object.manufacturer, "");
        const type = PcUtils.getValueOrDefault(object.type, "");
        const functions: DeviceFunction[] = [];
        
        const rawFunctions = PcUtils.getValueOrDefault(object.functions, []);
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
