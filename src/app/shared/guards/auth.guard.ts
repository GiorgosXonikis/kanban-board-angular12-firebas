import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private afAuth: AngularFireAuth,
                private snackBarService: SnackBarService) {
    }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const user = await this.afAuth.currentUser;
        const isLoggedIn = !!user;

        if (!isLoggedIn) {
            this.snackBarService.authError();
        }

        return isLoggedIn;
    }
}

