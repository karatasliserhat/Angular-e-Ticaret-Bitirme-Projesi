import { Route } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { paymentGuard } from './guards/payment-guard';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./pages/layouts/layouts'),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home')
            },
            {
                path: 'products/:categoryUrl',
                loadComponent: () => import('./pages/home/home')
            },
            {
                path:'',
                loadChildren:()=> import('./pages/auth/routes')

            },
            {
                path:'baskets',
                loadComponent:()=> import('./pages/baskets/baskets'),
                canActivate:[authGuard]

            },
            {
                path:'payment',
                loadComponent:()=> import('./pages/payment/payment'),
                canActivate:[paymentGuard,authGuard]
            },
            {
                path:'orders',
                loadComponent:()=> import(`./pages/orders/orders`),
                canActivate:[authGuard]
            }
        ]
    }
];
