import {Component} from '@angular/core';

import {Title} from './title';

@Component({
    selector: 'home',
    providers: [
        Title
    ],
    directives: [],
    styles: [require('./home.css')],
    template: require('./home.html')
})
export class Home {
    // TypeScript public modifiers
    constructor( public title: Title) {

    }

    ngOnInit() {
        console.log("Loaded home");
        // this.title.getData().subscribe(data => this.data = data);
    }
}
