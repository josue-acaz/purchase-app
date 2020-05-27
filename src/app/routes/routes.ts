import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginComponent } from '../pages/login/login.component';

export const routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: '../pages/home/home.module#HomeModule', canLoad: [AuthGuard], canActivate: [AuthGuard] },
            { path: 'user', loadChildren: '../pages/user/user.module#UserModule', canLoad: [AuthGuard], canActivate: [AuthGuard] },
            { path: 'request', loadChildren: '../pages/request/request.module#RequestModule', canLoad: [AuthGuard], canActivate: [AuthGuard] },
            { path: 'pendingrequests', loadChildren: '../pages/pending-requests/pending-requests.module#PendingRequestsModule', canLoad: [AuthGuard], canActivate: [AuthGuard] }
        ]
    },
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'login/:to',  component: LoginComponent },
    {path: 'login',  component: LoginComponent },
    {path: '**', redirectTo: 'home' } // Not found

];
