import { Injectable } from "@angular/core";
import { Device } from "./device.model";
import {
    GriddleConstants,
    GriddleService,
    RequestMethod
} from "../griddle";
import { BehaviorSubject, Observable } from "rxjs";
import { DeviceFunction } from "./device-definition/device-function.model";

@Injectable()
export class DeviceService {
    private _loadedDevices: BehaviorSubject<Device[]>;

    constructor(private _griddleService: GriddleService) {
        this._loadedDevices = new BehaviorSubject([]);

        this.reloadDevices();
    }

    executeDeviceFunction(device: Device, func: DeviceFunction, argument?: string) {
        const executeDeviceFunctionUrl = GriddleConstants.ApiUrls.Put.ExecuteDeviceFunction.format({
            device: device.id,
            func: func.name
        });
        let requestBody: any = null;
        if (argument) {
            // TODO: try to check type of argument against ArgumentType of func
            requestBody = {
                Argument: argument
            };
        }

        this._griddleService.apiCall(RequestMethod.Put, executeDeviceFunctionUrl, null, requestBody);
    }

    /**
     * Reload the list of devices for the current home from the server.
     * Subscribers to the loadedDevices array will be notified after the
     * new list of devices is loaded.
     */
    reloadDevices() {
        const getDevicesUrl = GriddleConstants.ApiUrls.Get.Device.format({
            home: "b0f528ae-b297-4c62-a764-ec441d760562"
        });
        this._griddleService.apiCall(RequestMethod.Get, getDevicesUrl)
            .map((rawResponseArray) => {
                if (!rawResponseArray) {
                    return [];
                }

                const deviceArray: Device[] = [];
                for (let rawDevice of rawResponseArray) {
                    deviceArray.push(Device.createFromObject(rawDevice));
                }
                return deviceArray;
            })
            .subscribe((devices: Device[]) => {
                this._loadedDevices.next(devices);
            });
    }

    getDevices(): Device[] {
        return this._loadedDevices.getValue();
    }

    getDevicesObservable(): Observable<Device[]> {
        return this._loadedDevices.asObservable();
    }
}
