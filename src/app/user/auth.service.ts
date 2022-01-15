import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user$ = new BehaviorSubject<firebase.User | null>(null);

    get user(): firebase.User | null {
        return this.user$.getValue();
    }

    get authState$(): Observable<firebase.User | null> {
        return this.afAuth.authState
    }

    constructor(private afAuth: AngularFireAuth) {
    }

    setUser(user: firebase.User | null): void {
        this.user$.next(user);
    }

    signIn(email: string, password: string): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    signUp(email: string, password: string): Promise<any> {
        return  this.afAuth.createUserWithEmailAndPassword(email, password);
    }

    resetPassword(email: string): Promise<any> {
        return this.afAuth.sendPasswordResetEmail(email);
    }

}