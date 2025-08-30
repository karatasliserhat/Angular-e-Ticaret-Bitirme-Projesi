export interface Navigation{
    title:string,
    icon:string,
    url:string
}

export const navigations: Navigation[]=[
    {
        title:"Ana Sayfa",
        url:"/",
        icon:"home"
    },
    {
        title:"Ürünler",
        url:"/products",
        icon:"featured_seasonal_and_gifts"
    },
    {
        title:"Kategoriler",
        url:"/categories",
        icon:"category"
    },
    {
        title:"Kullanıcılar",
        url:"/users",
        icon:"groups_2"
    }

]