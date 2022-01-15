import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../user/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private afAuth: AngularFireAuth,
                private authService: AuthService,
                private snackBarService: SnackBarService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.afAuth.user.pipe(
            map(user => {
                if (user) {
                    this.authService.setUser(user);
                    return true;
                } else {
                    this.snackBarService.authError();
                    return false;
                }
            })
        );
    }
}

