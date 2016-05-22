import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import { SHObject } from "./sh-objects.interface.ts";
import * as MockHelper from "./sh-objects.mock";

@Injectable()
export class SHObjectsService {
    constructor(private http: Http) {}

    getSHObjects(): SHObject[]{
        return MockHelper.generateMockSHObjects(10);
    }
}
