import React ,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Detail from "./Screens/Details/Details";
import Home from "./Screens/Home/Home";
import Landing from './Screens/Landing/Landing'

import  NavBarAll from "./Components/NavBar/NavBar"

import ContactForm from "./Components/ContactForm/ContactForm";
import EditProduct from "./Components/AdminProduct/EditProduct"
import Profile from "./Screens/Profile/Profile"

import MyOrders from "./Screens/MyOrders/MyOrders"; 

import {useDispatch ,useSelector} from 'react-redux'

import Cart from './Components/Cart/Cart'
import Dashboard from "./Screens/Dashboard/Dashboard";
import {getUserDetail} from './Actions/Auth'

import AddCategory from "./Components/AddCategory/AddCategory";
import Customers from "./Components/Customers/Customers";
 import Orders from "./Components/Orders/Orders"; 
import ResPassword from "./Components/RestarPassword/ResPassword";








function App() {
  const token = useSelector((state) => state.loginReducer.token);
  const isAuth = useSelector((state) => state.loginReducer.isAuth);
  const userDetail = useSelector((state) => state.loginReducer.userDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    token && !isAuth && !userDetail && dispatch(getUserDetail());
  }, [token, dispatch, userDetail, isAuth]);
  
  return (
    <div className="App">

      <NavBarAll />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/dashboard/admin" element={<Dashboard />} />
        <Route path="/dashboard/admin/EditProduct/:idProduct" element={<EditProduct />} />
        <Route path="/dashboard/admin/addCategory" element={<AddCategory />} />
        <Route path="/dashboard/admin/customers" element={<Customers />} />
        <Route path="/dashboard/admin/orders" element={<Orders/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:idProduct" element={<Detail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/orders" element={<MyOrders/>}/>
        {/* <Route path="/user" element={<Profile/>}/> */}

        <Route path="/recupass" element={<ResPassword/>}/>


      </Routes>


    </div>
  );
}

export default App;
