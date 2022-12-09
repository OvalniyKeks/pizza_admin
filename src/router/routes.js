
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Main', path: '', component: () => import('pages/Index.vue') },
      {
        name: 'Products',
        path: '/products/',
        component: () => import('pages/Product/Products.vue')
      },
      {
        name: 'ProductForm', path: 'form/:id?', component: () => import('pages/Product/ProductForm.vue')
      },
      {
        name: 'Category', path: '/category', component: () => import('pages/Category/Category.vue')
      },
      {
        name: 'CategoryForm', path: 'category/form/:id?', component: () => import('pages/Category/CategoryForm.vue')
      },
      {
        name: 'Sale', path: '/sale', component: () => import('pages/Sale/Sale.vue')
      },
      {
        name: 'SaleForm', path: 'sale/form/:id?', component: () => import('pages/Sale/SaleForm.vue')
      },
      {
        name: 'Orders', path: '/orders', component: () => import('pages/Order/Orders.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
