import { GriddleConstants, GriddleService, RequestMethod } from "../griddle";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import LoginResponseObject = GriddleConstants.ResponseObjects.LoginUserResponse;

/**
 * This class provides the NameList service with methods to
 * read names and add names.
 */
@Injectable()
export class UserService {

    constructor(private _griddleService: GriddleService) {

    }

    loginUser(email: string, password: string): Observable<LoginResponseObject> {
        const loginUrl = GriddleConstants.ApiUrls.Post.LoginUser;
        const body = {
            "Email": email,
            "Password": password
        };
        const observable = this._griddleService.apiCall(RequestMethod.Post, loginUrl, null, body)
            .map((responseObject: any) => {
                // Just need to cast the responseObject for typing purposes
                return <LoginResponseObject>responseObject;
            });

        return observable;
    }

    logoutUser(email: string): Observable<any> {
        // TODO: implement logout mechanism to griddle
        return Observable.of({});
    }
}
