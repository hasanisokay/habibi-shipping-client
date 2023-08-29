import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home/Home';
import FirstPage from './pages/home/FirstPage';
import SecondPage from './pages/home/SecondPage';
import Cart from './pages/home/Cart';
import Payment from './pages/Payment';
import AfterPayment from './pages/AfterPayment';
import Login from './pages/Login';
import Profile from './pages/Profile';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children:[
      {
        path: "/",
        element: <FirstPage/>
      },
      {
        path: "pickup-location",
        element: <SecondPage/>
      },
      {
        path: "cart",
        element: <Cart></Cart>
      },
      {
        path: "payment",
        element: <Payment></Payment>
      },
      {
        path: "success",
        element: <AfterPayment></AfterPayment>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "profile",
        element: <Profile></Profile>
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);