import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DeviceCardComponent } from "./device-card";
import {
    Device,
    DeviceService
} from "../shared";

@Component({
    selector: 'home-view',
    directives: [DeviceCardComponent],
    styles: [require('./home.scss')],
    template: require('./home.html')
})
export class HomeComponent implements OnInit {

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
    }
}
