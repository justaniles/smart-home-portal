import { Injectable } from "@angular/core";
import { AuthStorage } from "./authstorage";

@Injectable()
export class AuthService {

    constructor() {
    }

    get authToken(): string {
        return AuthStorage.getAuthToken();
    }

    storeAuthToken(email: string, token: string) {
        AuthStorage.storeAuthToken(email, token);
    }

    clearAuthToken(): void {
        AuthStorage.clearAuthToken();
    }
}
