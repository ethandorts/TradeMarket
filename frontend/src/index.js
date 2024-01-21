import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import BasketPage from './pages/BasketPage';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Store from './Store';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import AdminRoute from './components/AdminRoute';
import ShippingPage from './pages/ShippingPage';
import PrivateRoute from './components/PrivateRoute';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import OrdersListPage from './pages/Admin/OrdersListPage';
import ProductListPage from './pages/Admin/ProductListPage';
import ProductEditPage from './pages/Admin/ProductEditPage';
import ListUsersPage from './pages/Admin/ListUsersPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path='/product/:id' element={<ProductPage />} />
      <Route path='/basket' element={<BasketPage />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

    
    <Route path='/admin/orderList' element={<OrdersListPage />} />
    <Route path='/admin/productList' element={<ProductListPage />} /> 
    <Route path='/admin/product/:id/edit' element={<ProductEditPage />} />
    <Route path='/admin/userList' element={<ListUsersPage />} />
    <Route path='/shipping' element={<ShippingPage />} />
    <Route path='/payment' element={<PaymentPage />} />
    <Route path='/placeorder' element={<PlaceOrderPage />} />
    <Route path='/order/:id' element={<OrderPage />} />
    <Route path='/profile' element={<ProfilePage />} />
    </Route>
  )
)
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router}>
          <Router />
        </RouterProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);



reportWebVitals();
