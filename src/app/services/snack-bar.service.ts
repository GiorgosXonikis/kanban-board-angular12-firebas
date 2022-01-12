import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(private snackBar: MatSnackBar, private router: Router) {
    }

    authError() {
        this.snackBar
            .open('You must be logged in!', 'OK', {
                duration: 5000
            })
            .onAction()
            .pipe(tap(_ => this.router.navigate(['/login'])))
            .subscribe();

    }
}