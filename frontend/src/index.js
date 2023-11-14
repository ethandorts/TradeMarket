import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
    </Route>
  )
)
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Router>
        <App />
      </Router>
    </RouterProvider>
  </React.StrictMode>
);



reportWebVitals();
