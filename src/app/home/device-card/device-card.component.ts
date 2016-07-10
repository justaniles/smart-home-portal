import { Component, HostListener, Input, OnInit } from "@angular/core";
import {
    Device, DeviceService
} from "../../shared";

@Component({
    selector: 'device-card',
    styles: [require('./device-card.scss')],
    template: require('./device-card.html')
})
export class DeviceCardComponent implements OnInit {

    @Input() deviceDetails: Device;

    dropdownHidden: boolean = true;

    constructor(private _deviceService: DeviceService) {
    }

    ngOnInit() {
    }

    @HostListener("click")
    onClick() {
        console.log(`${this.deviceDetails.name} clicked! Executing primary action: ${this.deviceDetails.primaryFunction.name}`);
        this._deviceService.executeDeviceFunction(this.deviceDetails, this.deviceDetails.primaryFunction);
        
    }

    toggleDropdown(event: MouseEvent) {
        this.dropdownHidden = !this.dropdownHidden;
        event.stopPropagation();
        event.preventDefault();
    }
}
