import { Injectable } from "@angular/core";

import { Home } from "./home.model";
import { PcLocalStorage } from "../shared/pc-portal";

const CURRENT_HOME_KEY = "pc-current-home-view";

@Injectable()
export class HomeService {

    set currentHome(home: Home) {
        if (home) {
            PcLocalStorage.set(CURRENT_HOME_KEY, home.toJSON());
        } else {
            PcLocalStorage.set(CURRENT_HOME_KEY, null);
        }
    }

    get currentHome(): Home {
        const obj = PcLocalStorage.get(CURRENT_HOME_KEY);
        return obj ? Home.fromObject(obj) : null;
    }

    clearCurrentHome(): void {
        this.currentHome = null;
    }
}
