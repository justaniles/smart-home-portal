import { Component, OnInit } from "@angular/core";
import { Device, DevicesService, DeviceDefinitionService } from "../shared";

@Component({
    selector: 'home',
    providers: [DevicesService, DeviceDefinitionService],
    directives: [],
    styles: [require('./home.scss')],
    template: require('./home.html')
})
export class HomeComponent implements OnInit {

    devices: Device[];

    constructor(private devicesService: DevicesService) {
        this.devices = this.devicesService.getDevices();
    }

    ngOnInit() {
        console.log(this.devices);
    }
}
