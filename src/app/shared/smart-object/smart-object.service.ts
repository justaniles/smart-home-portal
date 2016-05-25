import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import { SmartObject } from "./smart-object.interfaces.ts";
import * as MockHelper from "./smart-object.mocks.ts";

@Injectable()
export class SmartObjectService {
    constructor(private http: Http) {}

    getSmartObjects(): SmartObject[]{
        return MockHelper.generateMockSmartObjects(10);
    }
}
