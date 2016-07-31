import localStorage = require("local-storage");
import { PcDiagnostics } from "../pc-portal";

const AUTH_TOKEN_KEY = "pancake-auth-token";

interface StoredAuthToken {
    token: string;
    expiration: string;
}

export class AuthStorage {

    static clearAuthToken(): void {
        this._storeAuthToken(null);
    }

    static storeAuthToken(token: string, expiration: Date): void {
        const authTokenToStore: StoredAuthToken = {
            token: token,
            expiration: expiration.toISOString()
        };
        this._storeAuthToken(authTokenToStore);
    }

    static getAuthToken(): string {
        let storedAuthToken: StoredAuthToken = localStorage.get(AUTH_TOKEN_KEY);
        if (!storedAuthToken) {
            return null;
        }

        // Check expiration
        const currentDate = new Date(Date.now());
        const storedDate = new Date(storedAuthToken.expiration);
        if (currentDate.getTime() > storedDate.getTime()) {
            this.clearAuthToken();
            return null;
        }

        return storedAuthToken.token;
    }

    private static _storeAuthToken(value: any) {
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
