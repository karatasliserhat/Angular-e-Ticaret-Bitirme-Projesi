import { Route } from '@angular/router';
import { loginGuard } from './guards/login-guard';

export const appRoutes: Route[] = [
    {
        path: 'login',
        loadComponent: () => import("./pages/login/login")
    },
    {
        path: '',
        loadComponent: () => import("./pages/layouts/layouts"),
        canActivateChild: [loginGuard],
        children: [
            {

                path: '',
                loadComponent: () => import("./pages/home/home")
            },
            {
                path:'',
                loadChildren:()=> import("./pages/products/routes")
            },
            {
                path:'',
                loadChildren:()=> import('./pages/categories/routes')
            },
            {
                path:'',
                loadChildren: ()=> import('./pages/users/routes')
            }
        ]
    }
];
