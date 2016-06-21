import { Component, HostListener, Input, OnInit } from "@angular/core";
import {
    Device
} from "../../shared";

@Component({
    selector: 'device-card',
    styles: [require('./device-card.scss')],
    template: require('./device-card.html')
})
export class DeviceCardComponent implements OnInit {

    @Input() deviceDetails: Device;

    dropdownHidden: boolean = true;

    private primaryFunction: string;
    private supportedFunctions: string[];

    constructor() {
    }

    ngOnInit() {
        this.primaryFunction = this.deviceDetails.deviceDefinition.primaryFunction;
        this.supportedFunctions = this.deviceDetails.deviceDefinition.supportedFunctions;
    }

    @HostListener("click")
    onClick() {
        console.log(`${this.deviceDetails.name} clicked! Primary action: ${this.primaryFunction}`);
    }

    toggleDropdown(event: MouseEvent) {
        this.dropdownHidden = !this.dropdownHidden;
        event.stopPropagation();
        event.preventDefault();
    }
}
