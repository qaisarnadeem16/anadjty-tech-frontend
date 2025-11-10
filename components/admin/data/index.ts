import { CategoriesIcon, HomeIcon, ProductsIcon } from "@/public/svgs";
import {   Filter, Notebook, Users } from "lucide-react";



export const SidebarData = [
    { name: 'Home', icon: HomeIcon, src: '/admin/home' },
    { name: 'Products', icon: ProductsIcon, src: '/admin/products' },
    { name: 'Categories', icon: CategoriesIcon, src: '/admin/categories' },
    { name: 'Blogs', icon: Notebook, src: '/admin/blogs' },
    { name: 'Subscribers', icon: Users, src: '/admin/subscribers' },
    { name: 'Product Filters', icon: Filter, src: '/admin/product-filters' },
    { name: 'Blog Filters', icon: Filter, src: '/admin/blog-filters' },
]
