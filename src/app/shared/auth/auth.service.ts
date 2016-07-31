import * as Q from "q";
import { AuthStorage } from "./authstorage";
import { GriddleConstants } from "../griddle";
import { Injectable } from "@angular/core";
import { UserService } from "../user";

@Injectable()
export class AuthService {

    constructor(private _userService: UserService) {
    }

    get authToken(): string {
        return AuthStorage.getAuthToken();
    }

    get isLoggedIn(): boolean {
        const storedAuthToken = AuthStorage.getAuthToken();
        if (storedAuthToken) {
            return true;
        }
        return false;
    }

    login(email: string, password: string): Q.Promise<any> {
        const deferred = Q.defer();

        this._userService.loginUser(email, password)
            .subscribe((authInformation: GriddleConstants.ResponseObjects.LoginUserResponse) => {
                const token = authInformation.Token;
                const expiration = new Date(authInformation.Expiration);

                AuthStorage.storeAuthToken(token, expiration);
                deferred.resolve();
            });

        return deferred.promise;
    }

    logout(): Q.Promise<any> {
        const deferred = Q.defer();

        this._userService.logoutUser("")
            .subscribe(() => {
                AuthStorage.clearAuthToken();
                deferred.resolve();
            });

        return deferred.promise;
    }

}
