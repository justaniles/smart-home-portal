import { Component, OnInit } from "@angular/core";
import {
    Device,
    DevicesService,
    DeviceDefinitionService,
    GriddleService,
    GriddleConstants
} from "../shared";
import {RequestMethod} from "@angular/http";

@Component({
    selector: 'home',
    providers: [DevicesService, DeviceDefinitionService],
    directives: [],
    styles: [require('./home.scss')],
    template: require('./home.html')
})
export class HomeComponent implements OnInit {

    devices: Device[];

    constructor(private devicesService: DevicesService, private griddleService: GriddleService) {
        this.devices = this.devicesService.getDevices();
    }

    ngOnInit() {
        let testUrl = GriddleConstants.ApiUrls.Get.Test;
        this.griddleService.apiCall(RequestMethod.Get, testUrl)
            .subscribe(
                (responseData) => {
                    console.log(`GRIDDLE RESPONSE: ${responseData}`);
                }, (error) => {
                    console.error(`GRIDDLE ERROR: ${error}`);
                });
        console.log(this.devices);
    }
}
