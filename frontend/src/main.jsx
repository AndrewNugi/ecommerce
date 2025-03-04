import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/features/store.js'

//Auth
import Login from './pages/auth/login.jsx'
import Register from './pages/auth/register.jsx'

import Profile from './pages/users/Profile.jsx'

//Private Route
import PrivateRoute from './components/PrivateRoute.jsx'

//Admin Route
import AdminRoute from './pages/admin/AdminRoute.jsx'
import UserList from './pages/admin/UserList.jsx'
import CategoryList from './pages/admin/CategoryList.jsx'
import ProductList from './pages/admin/ProductList.jsx'
import ProductUpdate from './pages/admin/ProductUpdate.jsx'
import AllProducts from './pages/admin/AllProducts.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Products/Favorites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Shop from './pages/Shop.jsx'
import Shipping from './pages/Orders/Shipping.jsx'
import PlaceOrder from './pages/Orders/PlaceOrder.jsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Order from './pages/Orders/Order.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />

      <Route path='' element = {<PrivateRoute />} >
        <Route path = '/profile' element = {<Profile />} />
        <Route path = '/shipping' element = {<Shipping />} />
        <Route path = '/placeorder' element = {<PlaceOrder />} />
        <Route path = '/order/:id' element = {<Order />} />
      </Route>

      {/* Admin Route */}
      <Route path='/admin' element = {<AdminRoute />}>
        <Route path='userlist' element = {<UserList />} />
        <Route path='categorylist' element = {<CategoryList />} />
        <Route path='productlist' element = {<ProductList />}/> 
        <Route path='product/update/:_id' element = {<ProductUpdate />}/> 
        <Route path='allproductslist' element = {<AllProducts />}/> 
      </Route>


    </Route>
  )
)

// This is the new way to render in React 18
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
); 
