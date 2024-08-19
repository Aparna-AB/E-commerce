import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Login from './components/User/Login/login.jsx';
import SignUp from './components/User/SignUp/signIn.jsx';
import NavBar from './components/NavBar/navBar.jsx';
import Footer from './components/Footer/footer.jsx';
import HomePage from './components/Home/homePage.jsx';
import ProfilePage from './components/User/ProfilePage/profilePage.jsx';
import Cart from './components/Cart/cart.jsx';
import ProductsList from './components/Products/productsList.jsx';
import ProductsDetails from './components/Products/productsDetails.jsx';
import SellerSignUp from './components/Seller/signUp/sellerSignUp.jsx';
import SellerLogin from './components/Seller/login/sellerLogin.jsx';
import ForgotPw from './components/forgotPw/forgotPw.jsx';
import UserOtp from './components/otp/userGetOtp.jsx';
import './index.css'
import ProfilePageSeller from './components/Seller/ProfilePage/profilePageSeller.jsx';
import AddProductDetails from './components/Seller/addProduct/addProductDetails.jsx';
import AdminSignUp from './components/Admin/signUp/signUp.jsx';
import AdminLogin from './components/Admin/login/login.jsx';
import AdminProfilePage from './components/Admin/profilePage/profilePage.jsx';
import { EditProfile } from './components/User/editProfile/editUser.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
       
    <BrowserRouter>
      <Routes>
      <Route path="/" element={< App />} />
       
        {/* User */}
        <Route path="/user/Login" element={< Login />} />
        <Route path="/user/SignUp" element={<SignUp />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/Footer" element={< Footer />} />
        <Route path="/HomePage" element={<HomePage />} />

        <Route path="/user/homePage" element={<ProfilePage  />} />
        <Route path="/user/editProfile" element={<EditProfile />} />

        {/* Product Details */}
        <Route path="/product/ProductsList" element={< ProductsList />} />
        <Route path="product/ProductsDetails/:id" element={< ProductsDetails />} />
        <Route path="/Cart" element={< Cart />} />

        {/* Seller */}
        <Route path="/seller/SellerSignUp" element={<SellerSignUp />} />
        <Route path="/seller/SellerLogin" element={<SellerLogin />} />
        <Route path="/seller/homePage" element={<ProfilePageSeller />} />
        <Route path="/seller/AddProductDetails" element={<AddProductDetails />} />

        {/* {Admin} */}
        <Route path="/admin/SignUp" element={<AdminSignUp />} />
        <Route path="/admin/Login" element={<AdminLogin />} />
        <Route path="/admin/ProfilePage" element={<AdminProfilePage />} />



        <Route path="/ForgotPw" element={<ForgotPw />} />
        <Route path="/UserOtp" element={< UserOtp />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
