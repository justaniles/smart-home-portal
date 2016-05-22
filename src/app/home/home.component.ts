import { Component } from "@angular/core";
import { SHObject, SHObjectsService } from "../shared";

@Component({
    selector: 'home',
    providers: [SHObjectsService],
    directives: [],
    styles: [require('./home.css')],
    template: require('./home.html')
})
export class Home {

    shObjects: SHObject[];

    constructor(private shoService: SHObjectsService) {
        this.shObjects = this.shoService.getSHObjects();
    }

    ngOnInit() {
        console.log(this.shObjects);
    }
}
