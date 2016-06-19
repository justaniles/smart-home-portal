import { Component, Input, OnInit } from "@angular/core";
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

    constructor() {
    }

    ngOnInit() {
        
    }
}
