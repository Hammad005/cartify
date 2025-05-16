import React, { useEffect } from 'react'
import { ThemeProvider } from './components/theme-provider'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Toaster } from "@/components/ui/sonner"
import { authStore } from './store/authStore'
import Loading from './components/Loading'
import { addressStore } from './store/addressStore'
import Dashboard from './pages/Dashboard'
import { productsStore } from './store/productStore'
import ProductDetails from './pages/ProductDetails'
import { cartStore } from './store/cartStore'
import CheckOut from './pages/CheckOut'
import HappyShopping from './pages/HappyShopping'
import { orderStore } from './store/orderStore'



const protectRoute = (condition, children, redirectTo) => {
  return condition ? children : <Navigate to={redirectTo} />
}

const App = () => {
  const {user, checkAuth, checkingAuth, getUsers} = authStore();
  const {getAddress} = addressStore();
  const {getAllProducts} = productsStore();
  const {getCart} = cartStore();
  const {getUserAllOrders, getAllOrders} = orderStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  useEffect(() => {
    if (user?.role === "client") {
      getAddress();
      getCart();
      getUserAllOrders();
    }
  }, [user, getAddress, getCart, getUserAllOrders])

  useEffect(() => {
    if (user?.role === "admin") {
      getAllOrders();
      getUsers();
    }
  }, [getAllOrders, user])
  

  useEffect(() => {
    getAllProducts()
  }, [getAllProducts])
  
  
  
  if (checkingAuth) return <Loading/>
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar/>
      <Routes>

        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home/>} />
        <Route path="/category/:category" element={<Category/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/profile" element={protectRoute(user?.role === "client", <Profile/>, "/login")} />
        <Route path="/dashboard" element={protectRoute(user?.role === "admin", <Dashboard/>, "/")} />
        <Route path="/cart" element={protectRoute(user?.role === "client", <Cart/>, "/login")} />
        <Route path="/checkout" element={protectRoute(user?.role === "client", <CheckOut/>, "/login")} />
        <Route path='/happyShopping' element={protectRoute(user?.role === "client", <HappyShopping/>, "/")} />
        <Route path='/login' element={protectRoute(!user, <Login/>, "/")} />
        <Route path='/signup' element={protectRoute(!user, <Signup/>, "/")} />

      </Routes>
      <Toaster />
    </ThemeProvider>
  )
}

export default App