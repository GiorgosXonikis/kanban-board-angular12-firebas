import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
    { path: '', redirectTo: 'kanban', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
        path: 'kanban',
        loadChildren: () =>
            import('./kanban/kanban.module').then(m => m.KanbanModule),
        canActivate: [AuthGuard]
    },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
