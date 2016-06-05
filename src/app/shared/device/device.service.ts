import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import { Device, DeviceFromServer } from "./device.interface";
import * as MockHelper from "./device.mock";
import { DeviceDefinitionService } from "../device-definition";

@Injectable()
export class DevicesService {
    private cachedDevices: Device[];
    
    constructor(private http: Http, private deviceDefinitionService: DeviceDefinitionService) {
        // Perform initial load of devices
        this.loadDevices();
    }

    loadDevices() {
        let devices: Device[] = [];
        let serverDevices: DeviceFromServer[] = MockHelper.generateMockDevices(10);
        
        // Resolve the device definition ids for each of the devices
        for (let d of serverDevices) {
            let def = this.deviceDefinitionService.findDeviceDefinition(d.deviceDefinitionId);
            devices.push({
                id: d.id,
                name: d.name,
                description: d.description,
                deviceDefinition: def
            });
        }
        
        this.cachedDevices = devices;
    }
    
    getDevices(): Device[]{
        return this.cachedDevices;
    }
}
