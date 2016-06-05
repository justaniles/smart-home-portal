import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import { DeviceDefinition } from "./device-definition.interface";
import * as MockHelper from "./device-definition.mock";

@Injectable()
export class DeviceDefinitionService {
    private loadedDefinitions: DeviceDefinition[];

    constructor(private http: Http) {
        this.loadedDefinitions = MockHelper.generateMockDeviceDefinitions();
    }

    /**
     * Get the DeviceDefinition object that has the provided id.
     * @param {string} id - The id to search for.
     */
    findDeviceDefinition(id: string) {
        let definition = this.loadedDefinitions.find((elem) => {
            if (elem.id === id) {
                return true;
            }
            return false;
        });

        return !!definition ? definition : null;
    }

    getDeviceDefinitions() {
        return this.loadedDefinitions;
    }
}
