import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private afAuth: AngularFireAuth) {
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