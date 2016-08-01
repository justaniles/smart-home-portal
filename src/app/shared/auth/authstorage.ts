import localStorage = require("local-storage");
import { PcDiagnostics } from "../pc-portal";

const AUTH_TOKEN_KEY = "pancake-auth-token";

interface StoredAuthToken {
    email: string;
    token: string;
}

export class AuthStorage {

    static clearAuthToken(): void {
        this._storeAuthToken(null);
    }

    static storeAuthToken(email: string, token: string): void {
        const authTokenToStore: StoredAuthToken = {
            email: email,
            token: token
        };
        this._storeAuthToken(authTokenToStore);
    }

    static getAuthToken(): string {
        let storedAuthToken: StoredAuthToken = localStorage.get(AUTH_TOKEN_KEY);
        if (!storedAuthToken) {
            return null;
        }

        return storedAuthToken.token;
    }

    private static _storeAuthToken(value: StoredAuthToken) {
        const success = localStorage.set(AUTH_TOKEN_KEY, value);
        if (!success) {
            PcDiagnostics.Log(
                PcDiagnostics.LogType.Error,
                "AuthStorage.setLocalStorage",
                "Unable to set a value in local storage. This could possibly be due to a QuotaExceededError being thrown."
            );
        }
    }
}
