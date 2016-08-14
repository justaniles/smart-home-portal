import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { ROUTER_DIRECTIVES } from "@angular/router";

import { Home } from "../home.model";
import { HomeService } from "../home.service";
import { GriddleConstants, GriddleService, RequestMethod } from "../../shared/griddle";

@Component({
    selector: '.pc-manage-homes',
    template: require('./manage-homes.html'),
    styles: [require('./manage-homes.scss')],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class ManageHomesComponent implements OnInit {

    homes: Home[] = [];
    loading = true;

    constructor(private griddleService: GriddleService, private homeService: HomeService) {
    }

    ngOnInit() {
        const getHomesUrl = GriddleConstants.ApiUrls.Get.Homes;
        this.griddleService.apiCall(RequestMethod.Get, getHomesUrl)
            .subscribe((rawResponse: any[]) => {
                rawResponse.forEach((rawHome) => {
                    const newHome = new Home(rawHome.Id, rawHome.Name, new Date(rawHome.Created));
                    this.homes.push(newHome);
                });

                this.loading = false;
            });
    }

    selectHome(home: Home) {
        this.homeService.currentHome = home;
    }
}
