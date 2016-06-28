import { Injectable } from "@angular/core";

import { Device, DeviceFromServer } from "./device.interface";
import * as MockHelper from "./device.mock";
import { DeviceDefinition, DeviceDefinitionService } from "../device-definition";
import {
    GriddleConstants,
    GriddleService,
    RequestMethod
} from "../griddle";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class DevicesService {
    private _loadedDevices: BehaviorSubject<Device[]>;

    constructor(private _deviceDefinitionService: DeviceDefinitionService, private _griddleService: GriddleService) {
        this._loadedDevices = new BehaviorSubject([]);

        // Whenever the deviceDefinitions change, reload the devices
        this._deviceDefinitionService.getObservableDeviceDefinitions()
            .subscribe((next: DeviceDefinition[]) => {
                if (next && next.length > 0) {
                    console.log("Reloading devices...");
                    this.reloadDevices();
                }
            });
    }

    reloadDevices() {
        const apiUrl = GriddleConstants.ApiUrls.Get.Device.format({
            home: "b0f528ae-b297-4c62-a764-ec441d760562"
        });
        this._griddleService.apiCall(RequestMethod.Get, apiUrl)
            .subscribe((serverDevices: DeviceFromServer[]) => {
                console.log(serverDevices);

                // Resolve the device definition ids for each of the devices
                const devices: Device[] = [];
                for (let d of serverDevices) {
                    let def = this._deviceDefinitionService.findDeviceDefinition(d.deviceDefinitionId);
                    if (def) {
                        devices.push({
                            id: d.id,
                            name: d.name,
                            description: d.description,
                            deviceDefinition: def
                        });
                    } else {
                        console.error(`[DEVICE SERVICE] Could not find DeviceDefinition for device '${d.name}'`);
                    }
                }
            });
    }

    getDevices(): Device[]{
        return this._loadedDevices.getValue();
    }
}
