import { Injectable } from "@angular/core";

import { DeviceDefinition } from "./device-definition.model";
import * as MockHelper from "./device-definition.mock";
import {
    GriddleConstants,
    GriddleService,
    RequestMethod
} from "../griddle";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class DeviceDefinitionService {
    private _loadedDefinitions: BehaviorSubject<DeviceDefinition[]>;

    constructor(private griddleService: GriddleService) {
        this._loadedDefinitions = new BehaviorSubject([]);

        const apiUrl = GriddleConstants.ApiUrls.Get.DeviceDefinitions;
        this.griddleService.apiCall(RequestMethod.Get, apiUrl)
            .subscribe((response) => {
                // TODO: remove following line once peter updates his shit
                const defArray = response.lifx;
                this._loadedDefinitions.next(defArray);
            });
    }

    /**
     * Get the DeviceDefinition object that has the provided id.
     * @param {string} id - The id to search for.
     */
    findDeviceDefinition(id: string) {
        let definition = this.getDeviceDefinitions().find((elem) => {
            if (elem.id === id) {
                return true;
            }
            return false;
        });

        return !!definition ? definition : null;
    }

    getDeviceDefinitions(): DeviceDefinition[] {
        return this._loadedDefinitions.getValue();
    }

    getDeviceDefinitionsObservable(): Observable<DeviceDefinition[]> {
        return this._loadedDefinitions.asObservable();
    }
}
