import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import BasketPage from './pages/BasketPage';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Store from './Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path='/product/:id' element={<ProductPage />} />
      <Route path='/basket' element={<BasketPage />} />
    </Route>
  )
)
root.render(
  <React.StrictMode>
    <Provider store={Store}>
    <RouterProvider router={router}>
      <Router>
        <App />
      </Router>
    </RouterProvider>
    </Provider>
  </React.StrictMode>
);



reportWebVitals();
