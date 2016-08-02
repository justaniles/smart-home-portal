import { Component, OnInit } from "@angular/core";
import { DeviceCardComponent } from "./device-card";
import {
    Device,
    DeviceService
} from "../shared";

@Component({
    selector: 'home',
    directives: [DeviceCardComponent],
    styles: [require('./home.scss')],
    template: require('./home.html')
})
export class HomeComponent implements OnInit {

    devices: Device[];

    constructor(private devicesService: DeviceService) {
    }

    ngOnInit() {
        this.devicesService.getDevicesObservable()
            .subscribe((devices: Device[]) => {
                this.devices = devices;
            });

    }
}
