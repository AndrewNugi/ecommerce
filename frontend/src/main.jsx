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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


    </Route>
  )
)

// This is the new way to render in React 18
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
); 
