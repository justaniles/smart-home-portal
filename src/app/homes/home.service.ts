import { Injectable } from "@angular/core";

import { Home } from "./home.model";
import { PcLocalStorage } from "../shared/pc-portal";

const CURRENT_HOME_KEY = "pc-current-home";

@Injectable()
export class HomeService {

    set currentHome(home: Home) {
        const convertedObject = {
            id: home.id,
            name: home.name,
            dateCreated: home.dateCreated
        };
        PcLocalStorage.set(CURRENT_HOME_KEY, convertedObject);
    }

    get currentHome(): Home {
        const obj = PcLocalStorage.get(CURRENT_HOME_KEY);
        return Home.fromObject(obj);
    }

}
