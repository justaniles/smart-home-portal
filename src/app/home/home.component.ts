import { Component, OnInit } from "@angular/core";
import { Device, DevicesService } from "../shared";

@Component({
    selector: 'home',
    providers: [DevicesService],
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
