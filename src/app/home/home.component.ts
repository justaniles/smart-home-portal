import {Component} from '@angular/core';

@Component({
    selector: 'home',
    providers: [],
    directives: [],
    styles: [require('./home.css')],
    template: require('./home.html')
})
export class Home {

    constructor( ) {

    }

    ngOnInit() {
        console.log("Loaded home");
    }
}
