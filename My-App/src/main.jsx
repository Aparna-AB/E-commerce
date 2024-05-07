import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/login.jsx';
import SignUp from './components/SignUp/signIn.jsx';
import NavBar from './components/NavBar/navBar.jsx';
import HomePage from './components/Home/homePage.jsx';
import Cart from './components/Cart/cart.jsx';
import ProductsList from './components/Products/productsList.jsx';
import ProductsDetails from './components/Products/productsDetails.jsx';
import ForgotPw from './components/forgotPw/forgotPw.jsx';
import UserOtp from './components/otp/userGetOtp.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< App />} />
        <Route path="/Login" element={< Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/HomePage" element={< HomePage />} />
        <Route path="/ProductsList" element={< ProductsList />} />
        <Route path="/ProductsDetails/:id" element={< ProductsDetails />} />
        <Route path="/ForgotPw" element={<ForgotPw />} />
        <Route path="/UserOtp" element={< UserOtp />}/>
        <Route path="/Cart" element={< Cart />} />
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>,
)
