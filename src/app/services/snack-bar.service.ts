import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { MatSnackBarRef } from '@angular/material/snack-bar/snack-bar-ref';
import { TextOnlySnackBar } from '@angular/material/snack-bar/simple-snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(private matSnackBar: MatSnackBar, private router: Router) {
    }

    warning(message = 'You must be logged in', action = 'OK', duration = 5000): MatSnackBarRef<TextOnlySnackBar> {
        return this.matSnackBar.open(
            message,
            action, {
                panelClass: ['snackbar-warning'],
                duration
            })
    }

    authError(): void {
        this.warning()
            .onAction()
            .pipe(
                tap(_ => this.router.navigate(['/login']))
            )
            .subscribe();
    }
}
