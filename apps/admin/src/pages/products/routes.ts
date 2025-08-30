import { Route } from "@angular/router";

export const productRoutes: Route[] = [
    {
        path: 'products',
        loadComponent: () => import("./products")
    },
    {
        path: 'products/create',
        loadComponent: () => import("./create/create")
    },
    {
        path: 'products/edit/:id',
        loadComponent: () => import("./create/create")
    }
]

export default productRoutes;