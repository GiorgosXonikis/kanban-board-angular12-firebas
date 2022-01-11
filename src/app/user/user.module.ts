import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserRoutingModule } from './user-routing.module';
import { GoogleSigninDirective } from './google-signin.directive';
import { SharedModule } from '../shared/shared.module';
import { EmailLoginComponent } from './email-login/email-login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        LoginPageComponent,
        GoogleSigninDirective,
        EmailLoginComponent
    ],
    imports: [
        UserRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class UserModule {
}