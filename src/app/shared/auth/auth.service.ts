import { Injectable } from "@angular/core";
import { PcLocalStorage } from "../pc-portal";

const AUTH_TOKEN_KEY = "pc-auth-token";

/**
 * User's auth token that is saved in local storage.
 */
interface StoredAuthToken {
    email: string;
    token: string;
}

@Injectable()
export class AuthService {

    constructor() {
    }

    /**
     * Gets the auth token currently saved in local storage.
     * @returns The current user's stored auth token, or null if no auth information is found.
     */
    get authToken(): string {
        let storedAuthToken: StoredAuthToken = PcLocalStorage.get(AUTH_TOKEN_KEY);
        if (!storedAuthToken) {
            return null;
        }

        return storedAuthToken.token;
    }


    /**
     * Gets the email associated with the auth token currently saved in local storage.
     * @returns The current user's email, or null if no auth information is found.
     */
    get authEmail(): string {
        let storedAuthToken: StoredAuthToken = PcLocalStorage.get(AUTH_TOKEN_KEY);
        if (!storedAuthToken) {
            return null;
        }

        return storedAuthToken.email;
    }

    /**
     * Stores a user's auth token in local memory.
     * NOTE: Calling this function multiple times will overwrite each previous entry.
     * @param email - The user's email
     * @param token - The user's auth token
     */
    storeAuthToken(email: string, token: string): void {
        const authTokenToStore: StoredAuthToken = {
            email: email,
            token: token
        };
        PcLocalStorage.set(AUTH_TOKEN_KEY, authTokenToStore);
    }

    /**
     * Clears the current auth information saved in local storage by overwriting it
     * with null.
     */
    clearAuthToken(): void {
        PcLocalStorage.set(AUTH_TOKEN_KEY, null);
    }
}
