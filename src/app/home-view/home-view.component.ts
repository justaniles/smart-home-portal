import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { DeviceCardComponent } from "./device-card";
import { HomeService } from "../homes";
import { Device, DeviceService } from "../shared/device";

@Component({
    selector: 'home-view',
    directives: [DeviceCardComponent, ROUTER_DIRECTIVES],
    styles: [require('./home-view.scss')],
    template: require('./home-view.html')
})
export class HomeViewComponent implements OnInit {

    devices: Device[];
    loading = true;
    userHasHomes = true;

    constructor(private devicesService: DeviceService, private homeService: HomeService) {
    }

    ngOnInit() {
        // First ensure the user has a home (because that'd be sad otherwise)
        if (!this.homeService.currentHome) {
            this.loading = false;
            this.userHasHomes = false;
            return;
        }

        this.loading = true;
        this.devicesService.getDevicesObservable()
            .subscribe((devices: Device[]) => {
                this.devices = devices;
                this.loading = false;
            });
        this.devicesService.reloadDevices();
    }
}
