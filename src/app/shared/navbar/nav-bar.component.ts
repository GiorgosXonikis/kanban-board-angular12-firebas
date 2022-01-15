import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { AuthService } from '../../user/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

    authState$!: Observable<firebase.User | null>;

    constructor(private breakpointObserver: BreakpointObserver,
                private authService: AuthService) {

        this.authState$ = this.authService.authState$;
    }

    /** Less than 600 px */
    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe([Breakpoints.Handset])
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

}
