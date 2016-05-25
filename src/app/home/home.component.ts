import { Component } from "@angular/core";
import { SmartObject, SmartObjectService } from "../shared";

@Component({
    selector: 'home',
    providers: [SmartObjectService],
    directives: [],
    styles: [require('./home.css')],
    template: require('./home.html')
})
export class Home {

    shObjects: SmartObject[];

    constructor(private smartObjectService: SmartObjectService) {
        this.shObjects = this.smartObjectService.getSmartObjects();
    }

    ngOnInit() {
        console.log(this.shObjects);
    }
}
