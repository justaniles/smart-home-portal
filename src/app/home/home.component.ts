import { Component, OnInit } from "@angular/core";
import { SmartObject, SmartObjectService } from "../shared";

@Component({
    selector: 'home',
    providers: [SmartObjectService],
    directives: [],
    styles: [require('./home.scss')],
    template: require('./home.html')
})
export class HomeComponent implements OnInit {

    smartObjects: SmartObject[];

    constructor(private smartObjectService: SmartObjectService) {
        this.smartObjects = this.smartObjectService.getSmartObjects();
    }

    ngOnInit() {
        console.log(this.smartObjects);
    }
}
