import { Injectable } from "@angular/core";
import { Device } from "./device.model";
import {
    GriddleConstants,
    GriddleService,
    RequestMethod
} from "../griddle";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class DevicesService {
    private _loadedDevices: BehaviorSubject<Device[]>;

    constructor(private _griddleService: GriddleService) {
        this._loadedDevices = new BehaviorSubject([]);

        this.reloadDevices();
    }

    reloadDevices() {
        const apiUrl = GriddleConstants.ApiUrls.Get.Device.format({
            home: "b0f528ae-b297-4c62-a764-ec441d760562"
        });
        this._griddleService.apiCall(RequestMethod.Get, apiUrl)
            .map((rawResponseArray) => {
                if (!rawResponseArray) {
                    return null;
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
