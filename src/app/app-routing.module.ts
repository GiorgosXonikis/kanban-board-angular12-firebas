import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
    { path: '', component: LandingPageComponent, canActivate: [AuthGuard] },
    {
        path: 'login',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
