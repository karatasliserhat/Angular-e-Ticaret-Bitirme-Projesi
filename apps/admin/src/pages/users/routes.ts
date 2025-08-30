import { Route } from '@angular/router';


export const usersRoutes: Route[] = [
    {
        path: 'users',
        loadComponent: () => import('./users')
    },
    {
        path: 'users/create',
        loadComponent: () => import('./create/create')
    },
    {
        path: 'users/edit/:id',
        loadComponent: () => import('./create/create')
    }
]

export default usersRoutes