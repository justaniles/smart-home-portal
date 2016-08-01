import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router) {
    }

    canActivate() {
        if (this._authService.authInfo) {
            return true;
        }
        this._router.navigate(['/login']);
        return false;
    }
}
