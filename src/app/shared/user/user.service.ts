import { Injectable } from "@angular/core";
/**
 * This class provides the NameList service with methods to
 * read names and add names.
 */
@Injectable()
export class UserService {

    loginUser(email: string, password: string): void {
        console.log(`user: ${email} password: ${password}`);
    }

    logoutUser(email: string) {

    }
}
