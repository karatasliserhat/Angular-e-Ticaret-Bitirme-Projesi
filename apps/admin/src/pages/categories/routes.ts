import { Route, Routes } from "@angular/router";



const categoryRoutes: Route[]=[
    {
        path:'categories',
        loadComponent:()=> import('../categories/categories')
    },
    {
        path:'categories/create',
        loadComponent:()=> import('../categories/create/create')
    },
    {
        path:'categories/edit/:id',
        loadComponent:()=> import('../categories/create/create')
    }
]

export default categoryRoutes