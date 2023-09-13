import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Cart from '../components/Cart'
import Layout from '../components/Layout'
import Homepage from '../pages/Homepage'
import PageNotFound from '../pages/PageNotFound'
import ProductList from '../pages/ProductList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: 'products',
        element: <ProductList />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: '*',
        element: <PageNotFound />
      }
    ]
  }
])

export default router
