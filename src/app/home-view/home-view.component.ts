import { Component, OnInit } from "@angular/core";
import { DeviceCardComponent } from "./device-card";
import {
    Device,
    DeviceService
} from "../shared";

@Component({
    selector: 'home-view',
    directives: [DeviceCardComponent],
    styles: [require('./home-view.scss')],
    template: require('./home-view.html')
})
export class HomeViewComponent implements OnInit {

    loading: boolean;
    devices: Device[];

    constructor(private devicesService: DeviceService) {
    }

    ngOnInit() {
        this.loading = true;
        this.devicesService.getDevicesObservable()
            .subscribe((devices: Device[]) => {
                this.devices = devices;
                this.loading = false;
            });
        this.devicesService.reloadDevices();
    }
}
